pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
        VERCEL_TOKEN = credentials('VARCEL_TOKEN')
    }

    options {
        skipDefaultCheckout(true)
    }
    stages {
        
        stage ('clean up code') {
            steps {
                cleanWs()
            }
        }

        stage ('Checkout using SCM') {
            steps {
                checkout scm
            }
        }

        stage('Take approval') {
            steps {
                input 'Should we deploy ?'
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

        stage('Test') {
            agent {
                docker {
                    image 'node:22.11.0-alpine3.20'
                    args '-u root'
                    reuseNode true //Reuse the node for the next stages
                }
            }

            steps {
                sh '''
                    npm run test
                    test -f dist/index.html
                '''
            }
        }
        stage('Deploy') {
            agent {
                docker {
                    image 'node:22.11.0-alpine3.20'
                    args '-u root'
                    reuseNode true //Reuse the node for the next stages
                }
            }
            steps {
                sh'''
                    npm install -g vercel
                    echo $MY_VAR
                    vercel --prod --token=$VERCEL_TOKEN --confirm --name=cicdproject
                '''
            }
        }
    }
}