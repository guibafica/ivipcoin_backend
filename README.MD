## Configuração

1. Clone o repositório:

   ```bash
   git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
   cd NOME_DO_REPOSITORIO
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
     ```env
     FIREBASE_PROJECT_ID=your_project_id
     FIREBASE_CLIENT_EMAIL=your_client_email
     FIREBASE_PRIVATE_KEY="your_private_key"
     ```

4. Execute o projeto:
   ```bash
   npm start
   ```

## Endpoints

- **GET /task/:id**: Retorna a task pelo ID.
