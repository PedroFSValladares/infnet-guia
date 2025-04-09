# Infnet-guia app

Projeto utilizado para estudos das ferramentas Docker, Kubernetes, Grafana e Prometheus

## Requisitos para rodar a aplicação localmente
- Docker
- Conta no DockerHub
- Minikube
- Kubectl
- Git

## Executando a aplicação

1. Execute o clone do repositório

        git clone https://github.com/PedroFSValladares/infnet-guia.git
   
2. Faça o build da imagem, e realize o pull para o seu DockerHub

        docker build -t <SeuUsuarioDockerHub>/<NomeDaAplicação> .
        docker login -u <SeuUsuarioDockerHub> -p <SuaSenhaDoDockerHub>
        docker push <SeuUsuarioDockerHub>/<NomeDaAplicação>
        
    > É essencial subir a imagem em seu DockerHub, pois será de onde o kubernetes buscará a imagem para os containers.

3. Após isso, é necessário alterar o nome da imagem no arquivo ``k8s/app/deployment.yaml``
  
        spec:
              containers: 
              - name: infnet-guia
                image: pedrofsvalladares/infnet-guia:1.1.0
                ports:
                  - containerPort: 3000
                env:
                  - name: NODE_ENV
                    value: "production"
4. Depois de ajustar o arquivo de Deployment, inicie o Minikube com ``minkube start``
5. Aplique a configuração dos clusters

        kubectl apply -f k8s/app/deployment.yaml
        kubectl apply -f k8s/app/service.yaml
        kubectl apply -f k8s/monitoring/prometheus-rbac.yaml
        kubectl apply -f k8s/monitoring/prometheus-configmap.yaml
        kubectl apply -f k8s/monitoring/prometheus-pvc.yaml
        kubectl apply -f k8s/monitoring/prometheus-deployment.yaml
        kubectl apply -f k8s/monitoring/prometheus-service.yaml

    >O prometheus não está acessível para fora do cluster, para acessa-lo, é necessário rodar o comando ``kubectl port-forward svc/prometheus 9090:9090`` e então acessa-lo através de http://localhost:9090.
6. Após aplicar as configurações, acessar a aplicação através do comando ``minikube service infnet-guia-service``.
    >O Grafana pode ser acessado usando o mesmo comando para acessar a aplicação: ``minikube service grafana``.
