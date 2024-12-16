pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'elareb/mon-api'
        GIT_REPO = 'https://github.com/ela2002/devops-project1.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/ela2002/devops-project1.git/'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE_NAME% .'
            }
        }
        
        stage('Push Docker Image to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    bat '''
                        echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin
                        docker push %DOCKER_IMAGE_NAME%
                    '''
                }
            }
        }
        
        stage('Push Code to GitHub') {
            steps {
                bat '''
                    git config --global user.name "Jenkins Bot"
                    git config --global user.email "jenkins@example.com"
                    git add .
                    git commit -m "Mise à jour après build Docker"
                    git push origin main
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline exécuté avec succès !'
        }
        failure {
            echo 'Le pipeline a échoué.'
        }
    }
}
