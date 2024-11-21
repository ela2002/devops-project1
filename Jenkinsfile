pipeline {
    agent any

    environment {
        DOCKER_IMAGE_NAME = 'elareb/mon-api2'
        GIT_REPO = 'https://github.com/ela2002/devops-project1.git'
        DOCKER_HUB_CREDENTIALS = 'dockerhub-credentials'  
        GITHUB_CREDENTIALS = 'github-credentials' 
    }

    stages {
        stage('Clone Repository') {
            steps {
                git credentialsId: "${GITHUB_CREDENTIALS}", url: "${GIT_REPO}"
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t ${DOCKER_IMAGE_NAME} .'
                }
            }
        }
        
        stage('Push Docker Image to Docker Hub') {
            steps {
                script {
                    // Pousser l'image vers Docker Hub
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS}", passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USERNAME')]) {
                        sh 'echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin'
                        sh 'docker push ${DOCKER_IMAGE_NAME}'
                    }
                }
            }
        }
        
        stage('Push Code to GitHub') {
            steps {
                script {
                    // Committer et pousser les changements vers GitHub
                    sh 'git add .'
                    sh 'git commit -m "Mise à jour après build Docker"'
                    sh 'git push origin master'  // Ou 'main' selon ta branche
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
