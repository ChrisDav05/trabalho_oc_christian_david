# trabalho_oc_christian_david

# Problema da Mochila 0/1 utilizando Branch and Bound

## Identificação do Aluno

**Nome completo: Christian David Teotônio Santos** 

---
# Introdução

O Problema da Mochila (Knapsack Problem) é um dos problemas clássicos de Otimização Combinatória e Pesquisa Operacional. Seu objetivo consiste em selecionar um subconjunto de itens que maximize o valor total transportado, respeitando a capacidade máxima da mochila.

Neste projeto foi utilizada a estratégia **Branch and Bound**, um **método exato** de otimização. Diferentemente das heurísticas e metaheurísticas, que buscam boas soluções sem garantia de optimalidade, o Branch and Bound garante a obtenção da solução ótima ao explorar sistematicamente a árvore de decisões e eliminar ramos que comprovadamente não podem produzir uma solução melhor.

O algoritmo funciona por meio de duas operações principais:

* **Branch (Ramificação):** divide o problema em subproblemas, gerando novos nós na árvore de busca.
* **Bound (Limite Superior):** calcula uma estimativa otimista do melhor resultado que pode ser obtido a partir de um determinado nó.

Sempre que o limite superior de um nó é menor ou igual à melhor solução já encontrada, esse ramo é descartado, reduzindo significativamente o número de soluções avaliadas.

Em relação à complexidade computacional, o Branch and Bound possui:

* **Melhor caso:** próximo de **O(n log n)**, quando muitas podas são realizadas.
* **Caso médio:** geralmente muito inferior ao da força bruta.
* **Pior caso:** **O(2ⁿ)**, quando praticamente não há podas e todos os subconjuntos precisam ser explorados.

Apesar do pior caso exponencial, o algoritmo costuma apresentar excelente desempenho para instâncias de tamanho moderado devido à eficiência das podas.

---

# Desenvolvimento

## Problema Resolvido

O projeto resolve o Problema da Mochila 0/1, no qual cada item pode ser:

* totalmente inserido na mochila; ou
* totalmente descartado.

Não é permitida a utilização de frações dos itens na solução final.

---

## Dados do Problema

Cada item possui duas informações:

* Peso
* Valor (lucro)

Além disso, existe uma capacidade máxima da mochila.

Exemplo utilizado:

| Item | Peso | Valor |
| ---- | ---- | ----: |
| 1    | 2    |    40 |
| 2    | 3    |    50 |
| 3    | 4    |    65 |
| 4    | 5    |    35 |

Capacidade da mochila:

```
7
```

---

## Função Objetivo

Maximizar o valor total transportado na mochila.

Matematicamente:

```
Maximizar

Z = Σ (valor_i × x_i)
```

onde:

* **xᵢ = 1**, caso o item seja selecionado;
* **xᵢ = 0**, caso contrário.

---

## Variáveis de Decisão

Para cada item:

```
x_i ∈ {0,1}
```

* 1 → item escolhido.
* 0 → item não escolhido.

---

## Restrição

A soma dos pesos dos itens selecionados não pode ultrapassar a capacidade da mochila.

```
Σ (peso_i × x_i) ≤ Capacidade
```

---

## Linguagem de Programação

* JavaScript (ES6)

---

## Bibliotecas Utilizadas

Nesta implementação não foram utilizadas bibliotecas externas. Foram empregados apenas recursos nativos da linguagem JavaScript, como:

* Classes
* Arrays
* map()
* sort()
* shift()
* push()

---

## Estratégia de Implementação

O algoritmo foi implementado seguindo as etapas abaixo:

1. Ordenação dos itens pela razão valor/peso.
2. Criação do nó raiz da árvore.
3. Cálculo do limite superior (Bound).
4. Inserção do nó na fila de prioridade (simulada com um vetor ordenado).
5. Remoção do nó com maior Bound.
6. Geração de dois novos nós:

   * incluir o próximo item;
   * excluir o próximo item.
7. Cálculo do Bound para cada novo nó.
8. Poda dos nós incapazes de superar a melhor solução encontrada.
9. Repetição do processo até que todos os nós promissores sejam explorados.

O cálculo do Bound utiliza o conceito da Mochila Fracionária apenas como estimativa do lucro máximo possível. Essa aproximação não altera a solução final, que continua sendo do tipo 0/1.

---

## Estrutura do Projeto

```
Projeto
│
├── Node
│      ├── level
│      ├── weight
│      ├── profit
│      └── bound
│
├── bound()
│
├── knapsackBranchBound()
│
└── exemplo de execução
```

---

## Instruções de Execução

1. Instale o Node.js (caso ainda não esteja instalado).
2. Salve o código em um arquivo chamado:

```
main.js
```

3. Abra o terminal na pasta do projeto.

4. Execute:

```bash
node main.js
```

Saída esperada:

```
Lucro máximo: 115
```

---

# Conclusão

O algoritmo Branch and Bound mostrou-se eficiente para resolver o Problema da Mochila 0/1, garantindo a obtenção da solução ótima sem a necessidade de explorar todas as combinações possíveis.

O uso do limite superior (Bound) permitiu eliminar diversos ramos da árvore de busca, reduzindo significativamente o esforço computacional em comparação com a abordagem por força bruta.

Durante o desenvolvimento, uma das principais dificuldades foi compreender o cálculo do Bound e sua relação com a Mochila Fracionária, já que essa técnica é utilizada apenas para estimar o potencial de um ramo, sem interferir na solução final do problema.

Outro aspecto importante foi a implementação da fila de prioridade em JavaScript, uma vez que a linguagem não possui esse recurso de forma nativa. Para este projeto, a prioridade foi simulada por meio da ordenação do vetor de nós pelo maior valor de Bound.

Os resultados obtidos demonstram que o Branch and Bound é uma estratégia eficiente para problemas de otimização combinatória de pequeno e médio porte, fornecendo soluções ótimas com um número reduzido de explorações quando comparado à busca exaustiva.

## Referências
https://en.wikipedia.org/wiki/Branch_and_bound
