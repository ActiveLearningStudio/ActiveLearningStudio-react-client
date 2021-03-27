stage('Cloning Git') {
    node('currikisndt') {
        checkout scm
    }
    node('currikiigniteshift') {
        checkout scm
    }
    node('currikishepherds') {
        checkout scm
    }
} 

stage('Install dependencies') {
    node('currikisndt') {
        nodejs('nodejs') {
            sh 'npm install'
            echo "Modules test installed"
        }
    }
    node('currikiigniteshift') {
        nodejs('nodejs') {
            sh 'npm install'
            echo "Modules test installed"
        }
    }
    node('currikishepherds') {
        nodejs('nodejs') {
            sh 'npm install'
            echo "Modules test installed"
        }
    }

}
stage('Build') {
    node('currikisndt') {
        nodejs('nodejs') {
            sh 'cp /root/curriki/client/.env.local .env.local'
            sh 'npm run build'
            echo "Build completed"
        }
    }
    node('currikiigniteshift') {
        nodejs('nodejs') {
            sh 'cp /root/curriki/client/.env.local .env.local'
            sh 'npm run build'
            echo "Build completed"
        }
    }
    node('currikishepherds') {
        nodejs('nodejs') {
            sh 'cp /root/curriki/client/.env.local .env.local'
            sh 'npm run build'
            echo "Build completed"
        }
    }
}

stage('Package Build') {
    node('currikisndt') {
        sh "tar -zcvf bundle.tar.gz build/"
    }
    node('currikiigniteshift') {
        sh "tar -zcvf bundle.tar.gz build/"
    }
    node('currikishepherds') {
        sh "tar -zcvf bundle.tar.gz build/"
    }
}

stage('Artifacts Creation') {
    node('currikisndt') {
        fingerprint 'bundle.tar.gz'
        archiveArtifacts 'bundle.tar.gz'
        echo "Artifacts created"
    }
    node('currikiigniteshift') {
        fingerprint 'bundle.tar.gz'
        archiveArtifacts 'bundle.tar.gz'
        echo "Artifacts created"
    }
    node('currikishepherds') {
        fingerprint 'bundle.tar.gz'
        archiveArtifacts 'bundle.tar.gz'
        echo "Artifacts created"
    }
}

stage('Stash changes') {
    node('currikisndt') {
        stash allowEmpty: true, includes: 'bundle.tar.gz', name: 'buildArtifacts'
    }
    node('currikiigniteshift') {
        stash allowEmpty: true, includes: 'bundle.tar.gz', name: 'buildArtifacts'
    }
    node('currikishepherds') {
        stash allowEmpty: true, includes: 'bundle.tar.gz', name: 'buildArtifacts'
    }
}
stage('Copying Build') {
    node('currikisndt') {
        echo 'Unstash'
        unstash 'buildArtifacts'
        echo 'Artifacts copied'

        echo 'Copy'
        sh "yes | sudo cp -R bundle.tar.gz /root/curriki/client && cd /root/curriki/client && sudo tar -xvf bundle.tar.gz && rm -rf html && cp -r build html && docker cp html currikiprod-client:/usr/share/nginx"
        echo 'Copy completed'
    }
    node('currikiigniteshift') {
        echo 'Unstash'
        unstash 'buildArtifacts'
        echo 'Artifacts copied'

        echo 'Copy'
        sh "yes | sudo cp -R bundle.tar.gz /root/curriki/client && cd /root/curriki/client && sudo tar -xvf bundle.tar.gz && rm -rf html && cp -r build html && docker cp html currikiprod-client:/usr/share/nginx"
        echo 'Copy completed'
    }
    node('currikishepherds') {
        echo 'Unstash'
        unstash 'buildArtifacts'
        echo 'Artifacts copied'

        echo 'Copy'
        sh "yes | sudo cp -R bundle.tar.gz /root/curriki/client && cd /root/curriki/client && sudo tar -xvf bundle.tar.gz && rm -rf html && cp -r build html && docker cp html currikiprod-client:/usr/share/nginx"
        echo 'Copy completed'
    }
}
