// ==========================================================
// Classe que representa um nó da árvore de busca
// Cada nó armazena um estado parcial da solução.
// ==========================================================
class Node {
    constructor() {

        // Nível da árvore (indica qual item está sendo analisado)
        // A raiz inicia em -1 porque nenhum item foi processado.
        this.level = -1;

        // Lucro (valor) acumulado dos itens escolhidos.
        this.profit = 0;

        // Peso acumulado dos itens escolhidos.
        this.weight = 0;

        // Limite superior (Upper Bound) do lucro que ainda pode
        // ser obtido a partir deste nó.
        // É utilizado para decidir se um ramo será explorado
        // ou descartado (poda).
        this.bound = 0;
    }
}

// ==========================================================
// Função responsável por calcular o Bound (limite superior)
// utilizando a ideia da Mochila Fracionária.
// Esse valor representa o maior lucro possível que pode ser
// alcançado a partir do nó atual.
// ==========================================================
function bound(node, n, capacity, weights, values) {

    // Se o peso atual já ultrapassou a capacidade,
    // o nó é inviável.
    if (node.weight >= capacity)
        return 0;

    // O lucro estimado começa com o lucro atual do nó.
    let profitBound = node.profit;

    // Peso acumulado até o momento.
    let totalWeight = node.weight;

    // Próximo item que será analisado.
    let j = node.level + 1;

    // ------------------------------------------------------
    // Adiciona itens completos enquanto houver capacidade.
    // ------------------------------------------------------
    while (j < n && totalWeight + weights[j] <= capacity) {

        // Soma o peso do item.
        totalWeight += weights[j];

        // Soma o valor do item.
        profitBound += values[j];

        // Passa para o próximo item.
        j++;
    }

    // ------------------------------------------------------
    // Caso ainda exista capacidade restante,
    // adiciona apenas uma fração do próximo item.
    // Isso NÃO altera a solução final.
    // Serve apenas para calcular uma estimativa otimista
    // do maior lucro possível (Upper Bound).
    // ------------------------------------------------------
    if (j < n) {
        profitBound +=
            (capacity - totalWeight) *
            (values[j] / weights[j]);
    }

    // Retorna o limite superior calculado.
    return profitBound;
}

// ==========================================================
// Função principal que resolve o Problema da Mochila
// utilizando o algoritmo Branch and Bound.
// ==========================================================
function knapsackBranchBound(weights, values, capacity) {

    // Quantidade de itens.
    const n = weights.length;

    // ------------------------------------------------------
    // Organiza os itens pela razão valor/peso.
    // Isso melhora a qualidade do Bound.
    // ------------------------------------------------------
    const items = weights.map((w, i) => ({
        weight: w,
        value: values[i],
        ratio: values[i] / w
    }));

    // Ordena em ordem decrescente da razão valor/peso.
    items.sort((a, b) => b.ratio - a.ratio);

    // Reconstrói os vetores já ordenados.
    weights = items.map(item => item.weight);
    values = items.map(item => item.value);

    // ------------------------------------------------------
    // Fila de nós.
    // Em JavaScript foi utilizado um vetor simples,
    // que será ordenado pelo Bound.
    // ------------------------------------------------------
    let queue = [];

    // Cria o nó raiz da árvore.
    let root = new Node();

    // Calcula o Bound da raiz.
    root.bound = bound(root, n, capacity, weights, values);

    // Insere a raiz na fila.
    queue.push(root);

    // Melhor lucro encontrado até o momento.
    let maxProfit = 0;

    // ======================================================
    // Enquanto existir algum nó para explorar...
    // ======================================================
    while (queue.length > 0) {

        // Ordena a fila para que o primeiro elemento
        // seja sempre o nó com maior Bound.
        queue.sort((a, b) => b.bound - a.bound);

        // Remove o nó mais promissor.
        let u = queue.shift();

        // --------------------------------------------------
        // PODA:
        // Se o Bound não consegue superar a melhor solução,
        // esse ramo é descartado.
        // --------------------------------------------------
        if (u.bound <= maxProfit)
            continue;

        // Se todos os itens já foram analisados,
        // não existem novos filhos.
        if (u.level === n - 1)
            continue;

        // ==================================================
        // Filho 1: INCLUI o próximo item.
        // ==================================================
        let v = new Node();

        // Avança para o próximo nível.
        v.level = u.level + 1;

        // Atualiza peso e lucro incluindo o item.
        v.weight = u.weight + weights[v.level];
        v.profit = u.profit + values[v.level];

        // Se a solução é válida e melhora o lucro,
        // atualiza a melhor solução encontrada.
        if (v.weight <= capacity && v.profit > maxProfit) {
            maxProfit = v.profit;
        }

        // Calcula o Bound desse novo nó.
        v.bound = bound(v, n, capacity, weights, values);

        // Apenas continua explorando se ainda houver
        // possibilidade de superar a melhor solução.
        if (v.bound > maxProfit)
            queue.push(v);

        // ==================================================
        // Filho 2: NÃO inclui o próximo item.
        // ==================================================
        let v2 = new Node();

        // Avança um nível.
        v2.level = u.level + 1;

        // Mantém o mesmo peso e lucro,
        // pois o item foi descartado.
        v2.weight = u.weight;
        v2.profit = u.profit;

        // Calcula o Bound desse ramo.
        v2.bound = bound(v2, n, capacity, weights, values);

        // Se ainda houver possibilidade de melhorar,
        // adiciona o nó na fila.
        if (v2.bound > maxProfit)
            queue.push(v2);
    }

    // Retorna o maior lucro encontrado.
    return maxProfit;
}

// ==========================================================
// EXEMPLO DE EXECUÇÃO
// ==========================================================

// Pesos dos itens.
const pesos = [2, 3, 4, 5];

// Valores (lucros) dos itens.
const valores = [40, 50, 65, 35];

// Capacidade máxima da mochila.
const capacidade = 7;

// Executa o algoritmo.
const resultado = knapsackBranchBound(
    pesos,
    valores,
    capacidade
);

// Exibe o resultado final.
console.log("Lucro máximo:", resultado);