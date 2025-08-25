# GG Money

Um aplicativo web para **gestão de gastos pessoais** com visão **diária**, **semanal** e **mensal**, orçamentos, metas de economia, insights automáticos e PWA.

> **Stack**: Vite + React + Context API · Tailwind CSS · Framer Motion · (opcional) Workbox/Service Worker · Deploy via GitHub Pages.

---

##  Funcionalidades

* **Resumo financeiro** por período (Hoje / Semana / Mês)
* **Orçamento** do período e **restante** disponível
* **Cofrinho** (meta de economia)
* **Adicionar/editar/excluir** gastos com **categoria**, **data** e **observação**
* **Insights** automáticos (categoria que mais gastou, alertas, etc.)
* **Gráfico** dos gastos do mês
* **PWA**: ícones, manifest e tema para instalação em dispositivos

---

##  Demonstração

* **GitHub Pages**: *adicione aqui a URL publicada do repositório*

> Dica: No GitHub Pages para repositórios de projeto, a URL fica no formato:
> `https://SEU_USUARIO.github.io/NOME_DO_REPO/`

---

##  Requisitos

* **Node.js** >= 18
* **npm** (ou pnpm/yarn)

---

## 🛠 Como rodar localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Gerar build de produção
npm run build

# Visualizar o build localmente
npm run preview
```

---

## 🗂 Estrutura (resumo)

```
public/
  bg.png
  icons/
    favicon-16.png
    favicon-32.png
    icon-192.png
    icon-512.png
  manifest.webmanifest
  service-worker.js        # se estiver usando SW manual

src/
  components/
    AddExpense.jsx
    BudgetSummary.jsx
    ExpenseChart.jsx
    ExpenseList.jsx
    Insights.jsx
    SavingsGoal.jsx
  context/
    ExpenseContext.js
  main.jsx
  index.css
index.html
vite.config.js
```

---

## ⚙️ Configuração importante para GitHub Pages

Como o site é servido em **/NOME\_DO\_REPO/**, evite **caminhos absolutos** iniciando com `/`.

### 1) `vite.config.js`

Se preferir base fixa (opcional):

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // base: '/NOME_DO_REPO/', // opcional se você usar BASE_URL em runtime
})
```

### 2) Usar `import.meta.env.BASE_URL` para assets públicos

Em componentes, para imagens colocadas em `public/` (ex.: `public/bg.png`):

```jsx
style={{
  backgroundImage: `url(${import.meta.env.BASE_URL}bg.png)`,
}}
```

Isso garante que a URL seja correta localmente e no GitHub Pages.

### 3) `package.json`

Inclua scripts de deploy com **gh-pages** (opcional, caso não use action):

```json
{
  "homepage": "https://SEU_USUARIO.github.io/NOME_DO_REPO/",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

> Instale o pacote: `npm i -D gh-pages`

### 4) Manifest e ícones

No `index.html` (apontando para a pasta `public/`):

```html
<link rel="manifest" href="./manifest.webmanifest" />
<link rel="icon" type="image/png" sizes="32x32" href="./icons/favicon-32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="./icons/favicon-16.png" />
<link rel="apple-touch-icon" sizes="192x192" href="./icons/icon-192.png" />
<link rel="apple-touch-icon" sizes="512x512" href="./icons/icon-512.png" />
```

### 5) (Opcional) Service Worker no GitHub Pages

Se registrar manualmente o SW, **use o BASE\_URL** para evitar 404:

```js
// Exemplo de registro (em src/main.jsx ou onde preferir)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = import.meta.env.BASE_URL;
    navigator.serviceWorker.register(`${base}service-worker.js`, { scope: base })
      .catch(console.error);
  });
}
```

Assim o arquivo será buscado em `.../NOME_DO_REPO/service-worker.js` com o **scope** correto.

---

##  Fluxo de uso

1. Defina o **período** (Hoje / Semana / Mês)
2. Configure seu **orçamento**
3. Registre **gastos** com valor, categoria e data
4. Veja **insights** automáticos e o **resumo**
5. Acompanhe no **gráfico** e ajuste metas no **cofrinho**

---

##  Decisões de UI/UX

* **Tailwind** para produtividade e consistência visual com tema escuro
* **Framer Motion** para transições sutis
* **Tipografia** legível com foco no painel/resumo
* Ícones e cores destacando **status** (positivo/negativo/alertas)

---

##  Contribuindo

Sinta-se à vontade para abrir **Issues** e **Pull Requests** com melhorias, correções e novas ideias (categorias, relatórios, filtros, exportações, etc.).

---

##  Licença

Este projeto está sob a licença **MIT**. Veja o arquivo `LICENSE`.

---

##  Capturas 

Adicione aqui screenshots do app:

* **Dashboard** (Resumo/Insights)
* <img width="1907" height="906" alt="image" src="https://github.com/user-attachments/assets/45f284a4-77de-4db7-9d86-d29ed313e9d8" />

* **Adicionar Gasto**
* <img width="1175" height="361" alt="image" src="https://github.com/user-attachments/assets/2a9c12c0-bf93-456d-8a11-dea0a49d626a" />

* **Gráfico e Cofre**
  <img width="1136" height="527" alt="image" src="https://github.com/user-attachments/assets/b5c8f93f-442e-4dd3-afb4-8d8747b51664" />


> Dica: coloque suas imagens em `./docs/` e referencie-as no README.

---

##  Contato

* Autor: Yuri de Sousa Silva
* Portfólio: https://yurihbo.github.io/Portifolio-dev/
* LinkedIn: www.linkedin.com/in/yuri-de-sousa-silva

---

**Bem-vindo ao GG Money!** Organize seus gastos, defina metas e acompanhe sua evolução🚀
