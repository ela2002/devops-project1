pipeline {
    agent any
    tools{
        nodejs 'NodeJS'
    }
    environment {
        DOCKER_HUB_REPO = 'elareb/mon-api'
        DOCKER_REGISTRY= 'https://hub.docker.com/repositories/elareb'
        DOCKERHUB_CREDENTIALS_ID = 'dockerhub-credentials'
        GIT_REPO = 'https://github.com/ela2002/devops-project1.git'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/ela2002/devops-project1.git/'
            }
        }
        stage('Install node dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Build Docker Image') {
            steps {
				script {
					dockerImage = docker.build("${DOCKER_HUB_REPO}:latest")
				}
			}
        }
        
        stage('Push Docker Image to DockerHub'){
			steps {
				script {
					docker.withRegistry('https://registry.hub.docker.com', "${DOCKERHUB_CREDENTIALS_ID}"){
						dockerImage.push('latest')
					}
				}
			}
		}
       stage('Deploy Docker Container') {
    steps {
        script {
            bat "docker pull ${DOCKER_HUB_REPO}:latest"
            
            bat "docker run -d -p 8082:8080 ${DOCKER_HUB_REPO}:latest"
        }
    }
}
        stage('Push Code to GitHub') {
    steps {
        withCredentials([string(credentialsId: 'github-credentials', variable: 'GITHUB_TOKEN')]) {
            bat """
                git config --global user.name "Jenkins Bot"
                git config --global user.email "elarebai@example.com"
                git add .
                git diff --exit-code || git commit -m "Mise à jour après build Docker"
                git push https://$GITHUB_TOKEN@github.com/ela2002/devops-project1.git
            """
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
