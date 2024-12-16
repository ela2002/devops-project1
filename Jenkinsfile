pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'elareb/mon-api2'
        GIT_REPO = 'https://github.com/ela2002/devops-project1.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                // Clone the GitHub repository
                git credentialsId: 'github-credentials', url: "${GIT_REPO}"
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t ${DOCKER_IMAGE_NAME} .'
                }
            }
        }
        
        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    // Push the Docker image to Docker Hub
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh 'docker push ${DOCKER_IMAGE_NAME}'
                    }
                }
            }
        }
        
        stage('Push Code to GitHub') {
            steps {
                script {
                    // Commit and push changes to GitHub
                    sh '''
                        git config --global user.name "Jenkins Bot"
                        git config --global user.email "jenkins@example.com"
                        git add .
                        git commit -m "Mise à jour après build Docker"
                        git push origin main
                    '''
                }
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
