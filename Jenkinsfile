pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /root/curriki/client/build"
                sh "sudo cp -r ${WORKSPACE}/build/ /root/curriki/client/build/"
            }
        }
    }
}

