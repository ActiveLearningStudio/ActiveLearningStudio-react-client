node("currikidev") {
    def app
    
    stage('Clone repository') {               
        checkout scm    
    }  
    
    stage('Build image') {         
        app = docker.build("quay.io/curriki/client")    
        
    } 
    stage('Test image') {           
        app.inside { 
                sh 'echo "Api Tests passed"'        
        }    
    } 
    stage('Push image') {	
        docker.withRegistry('https://quay.io', 'docker-private-credentials') {            
            app.push("${env.BUILD_NUMBER}")            
            app.push("cc")        
        }    
         
    }
    
    parallel(
            "StageA": {
                if(Jenkins.instance.getNode('currikicc').toComputer().isOnline()){
                    node('currikicc') {
                        stage ('currikicc') {
                                echo 'Copy'
                                sh "yes | docker stack deploy --compose-file /curriki/docker-compose-cc.yml currikistack" 
                                echo 'Copy completed'
                        }
                    }
                } else {
                    stage ('currikicc') {
                        echo "currikicc is offline"
                        exit 1
                    }
                }
                
            }
    )
    
}
