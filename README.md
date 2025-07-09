# 🎯 Projeto Three.js - Visualização 3D

## 📋 Descrição do Projeto

Este é um projeto acadêmico de visualização 3D desenvolvido em JavaScript puro utilizando a biblioteca Three.js. O projeto demonstra conceitos fundamentais de computação gráfica 3D, incluindo renderização, shaders customizados, texturas, animações e diferentes tipos de câmera.

## 🛠️ Tecnologias Utilizadas

- **JavaScript ES6+** - Linguagem principal
- **Three.js (r128)** - Biblioteca para gráficos 3D WebGL
- **WebGL** - API de renderização 3D no navegador
- **GLSL** - Linguagem de shaders (vertex e fragment)
- **HTML5 Canvas** - Para geração de texturas procedurais
- **CSS3** - Estilização da interface

## 📁 Estrutura do Projeto

```
ProjetoPG/
├── index.html              # Página principal com canvas WebGL
├── main.js                 # Código principal da aplicação
├── shaders/                # Pasta com shaders customizados
│   ├── custom-vertex.glsl  # Vertex shader com animação de ondas
│   └── custom-fragment.glsl # Fragment shader com cores animadas
├── assets/                 # Recursos do projeto
│   └── texture-generator.js # Gerador de texturas procedurais
└── README.md              # Documentação do projeto
```

## ✅ Requisitos Implementados

### 🌟 Funcionalidades Básicas
- [x] **Cena 3D inicial** com fundo cinza escuro (`#1a1a1a`)
- [x] **Objetos 3D simples**: Cubo, esfera, plano e avião
- [x] **Duas câmeras**: Perspectiva e ortográfica com alternância
- [x] **Texturas básicas** aplicadas em todos os objetos (xadrez, gradiente)
- [x] **Animações** de rotação, translação e movimento circular
- [x] **Posicionamento e escala** individuais dos objetos
- [x] **Controles de câmera** com mouse usando `OrbitControls`

### 🎨 Detalhes da Implementação

#### 1. **Cena e Iluminação**
- Fundo cinza escuro para contraste
- Luz ambiente suave (0x404040)
- Luz direcional principal (0xffffff)

#### 2. **Objetos 3D**
- **Cubo**: Textura xadrez, posição (-3, 0.5, 0), estático flutuando sobre o plano
- **Esfera**: Textura gradiente radial, posição (3, 0, 0), escala 1.0x, movimento de quique
- **Plano**: Textura xadrez 32x32, posição (0, -2, 0), rotacionado horizontalmente
- **Avião**: Modelo 3D simples composto por corpo e asas, realizando movimento circular ao redor da cena

#### 3. **Câmeras**
- **Perspectiva**: FOV 75°, posição (5, 5, 5)
- **Ortográfica**: Frustum 10x10, mesma posição
- Alternância com tecla `C`

#### 4. **Texturas Aplicadas**
- **Cubo e Plano**: Textura xadrez procedural (padrão alternado)
- **Esfera**: Textura gradiente radial (amarelo → laranja → rosa)
- **Geração**: Texturas criadas via HTML5 Canvas



## 🎮 Como Interagir com a Cena

### 🖱️ Controles do Mouse
- **Botão esquerdo + arrastar**: Rotacionar câmera ao redor da cena
- **Botão direito + arrastar**: Mover câmera (pan)
- **Scroll**: Zoom in/out
- **Botão do meio + arrastar**: Zoom dinâmico

### ⌨️ Controles do Teclado
- **Tecla C**: Alternar entre câmera perspectiva e ortográfica

### 📱 Responsividade
- A aplicação se adapta automaticamente ao redimensionamento da janela
- Ambas as câmeras mantêm proporção correta

## 🎭 Animações Implementadas

1. **Cubo com Textura**:
   - Objeto estático flutuando sobre o plano
   - Textura xadrez aplicada
   - Sem animações (objeto de referência)

2. **Esfera com Textura**:
   - Movimento de quique realista (não atravessa o plano)
   - Rotação no eixo Y
   - Textura gradiente estática

3. **Plano Base**:
   - Rotação suave no eixo Z
   - Textura xadrez com padrão repetido
   - Tamanho expandido (32x32 unidades)

4. **Avião**:
   - Movimento circular contínuo ao redor dos objetos centrais
   - Orientação automática na direção do movimento
   - Inclinação suave para o centro da curva
   - Altura constante durante o voo
   - Raio de voo de 8 unidades

## 🚀 Como Executar

1. **Clone ou baixe o projeto**
2. **Abra o arquivo `index.html`** em um navegador moderno
3. **Aguarde o carregamento** dos recursos Three.js via CDN
4. **Interaja com a cena** usando mouse e teclado

### 📋 Requisitos do Sistema
- Navegador com suporte WebGL (Chrome, Firefox, Safari, Edge)
- Conexão com internet (para CDN do Three.js)
- Hardware com suporte básico para aceleração gráfica

## 🔧 Arquitetura do Código

### 📦 Módulos Principais

1. **Inicialização** (`init()`):
   - Configuração da cena, câmeras e renderer
   - Criação de objetos e configuração de eventos

2. **Criação de Objetos** (`createObjects()`):
   - Factory methods para cada tipo de objeto
   - Aplicação de materiais e texturas específicos

3. **Loop de Animação** (`animate()`):
   - Renderização contínua a 60 FPS
   - Atualização de animações baseadas no tempo
   - Sincronização com `requestAnimationFrame`

## 📊 Performance e Otimizações

- **Damping nos controles**: Suaviza movimentos da câmera
- **Reutilização de texturas**: Canvas gerados uma única vez
- **Geometrias simples**: Baixo número de vértices para performance
- **Animações otimizadas**: Cálculos matemáticos eficientes

## 🎓 Valor Acadêmico

Este projeto demonstra:
- **Fundamentos de WebGL** através do Three.js
- **Texturas procedurais** e mapeamento UV
- **Transformações 3D** (rotação, translação, escala)
- **Sistemas de coordenadas** e projeções
- **Iluminação básica** (ambiente + direcional)
- **Controles de câmera** e interatividade
- **Arquitetura modular** de aplicações gráficas
- **Animações baseadas em tempo** e física básica

## 🐛 Troubleshooting

### Problema: Texturas não aparecem
**Solução**: Verifique se o arquivo `texture-generator.js` está carregando

### Problema: Controles não funcionam
**Solução**: Certifique-se de que o OrbitControls está carregando via CDN

### Problema: Performance baixa
**Solução**: Teste em outro navegador ou verifique suporte WebGL

---

**Desenvolvido para fins acadêmicos** | **Three.js r128** | **WebGL** 