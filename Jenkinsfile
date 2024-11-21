pipeline {
    agent any
    stages {
        
        stage ('clean up code') {
            steps {
                cleanWs()
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:22.11.0-alpine3.20'
                    args '-u root'
                    reuseNode true // Reuse the node for the next stages
                }
            }
            steps {

                sh '''
                    ls -l
                    node --version
                    npm --version
                    npm install
                    npm run build
                    ls -l
                '''       
            }
        }
    }
}