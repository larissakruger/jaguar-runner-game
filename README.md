# Jaguar Runner

Um remake estilizado do clássico **Chrome Dino Runner**, agora com uma **onça brasileira** como protagonista!

<img src="img/preview.gif" alt="Jaguar Runner Gameplay" width="600"/>
---

## ✨ Funcionalidades

- **Corrida Infinita:** O cenário e os obstáculos se movem, simulando movimento contínuo.
- **Obstáculos Aleatórios:** Cactos são gerados em intervalos imprevisíveis, aumentando o desafio.
- **Detecção de Colisão:**Quando o jaguar atinge um obstáculo, o jogo acaba e reinicia automaticamente.
- **Pontuação em Tempo Real:** A pontuação aumenta com o tempo de sobrevivência.
- **High Score Automático:** A melhor pontuação é salva no navegador usando LocalStorage.
- **Modo Escuro:** Um botão ativa o dark mode, que permanece salvo na próxima visita.
- **Responsivo:** O jogo se adapta automaticamente a diferentes tamanhos de tela (desktop e mobile).

## 🛠️ Tecnologias Utilizadas
- **HTML5** – Estrutura, elementos semânticos e área do jogo.
- **CSS3** – Responsividade, pixel-shadow retrô, animações e layout.
- **JavaScript** – Game loop (requestAnimationFrame), colisões, geração de obstáculos, controles e armazenamento (localStorage).
- **Piskel** – Plataforma utilizada para criar todos os sprites em pixel-art (jaguar, cactos, nuvens, ícones, etc.).

## 📁 Estrutura do Projeto
   
```
jaguar-runner/
├── index.html                     # Estrutura do jogo
├── styles.css                     # Estilos, temas e layout responsivo
├── script.js                      # Arquivo principal que integra todos os módulos
├── cacto.js                       # Lógica dos obstáculos
├── terreno.js                     # Movimento e animação do chão
├── jaguar.js                      # Comportamento, animação e pulo do jaguar
├── updateCustomProperty.js        # Função utilitária para manipular variáveis
├── LICENSE.md                     # Licença MIT
├── README.md                      # Este arquivo
├── img/
│   ├── cacto.png
│   ├── jaguar-andando-0.png
│   ├── jaguar-andando-1.png
│   ├── jaguar-parado.png                           
│   ├── jaguar-perdeu.png
│   ├── restart-button.png
│   ├── tema.png
│   ├── terreno.png
│   ├── screenshot-1.png
│   ├── screenshot-2.png
│   └── screenshot-3.png
└── sounds/                       
    ├── jump.mp3
    ├── lose.mp3 
    └── milestone.mp3
```

## 🚀 Como Usar


1. **Clone o repositório** ou baixe os arquivos:
   ```bash
   git clone https://github.com/larissakruger/jaguar-runner-game.git
   cd jaguar-runner-game
   ```

2. **Abra o arquivo**:
   - Localize `index.html` e abra no navegador (duplo clique ou clique direito → Abrir)

3. **Use o app**:
- Pressione qualquer tecla para iniciar
- Use ESPAÇO para pular
- Evite obstáculos e tente bater seu recorde

## 📸 Screenshots

<p align="center">
  <img src="img/screenshot-1.png" alt="Tela inicial" width="500"/>
</p>

<p align="center">
  <img src="img/screenshot-2.png" alt="Tela jogo rodando" width="500"/>
</p>

<p align="center">
  <img src="img/screenshot-3.png" alt="Tela de Game Over" width="500"/>
</p>