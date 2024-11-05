# TP-Engenharia-de-Software
Repositório destinado para o trabalho prático da matéria de engenharia de software.

## Objetivos e Features

Sistema a ser desenvolvido: Plataforma de consulta facilitada a processos judiciários a partir do código desse.
As principais features a serem aplicadas serão:

- Cadastro de usuário;
- Página de Perfil de usuário;
- Página de descrição do processo;
- Consulta à processos via código;
- Acesso rápido a processos via histórico do usuário;

## Membros da Equipe e Funções
Alex Eduardo Alves dos Santos - Desenvolvedor front-end

Kayque Meira Siqueira - Desenvolvedor back-end

Mateus Augusto Gomes - Desenvolvedor front-end

Rubens da Cunha Castro - Desenvolvedor back-end

## Tecnologias

| Layer da Aplicação | Tecnologias |
| --- | --- |
| Front-end | Typescript + Next |
| Back-end | Node.js + Typescript + ORM Prisma |
| Banco de dados | SQLite |

## Backlog do Produto (Histórias de Usuário):

1. Como usuário eu gostaria de visualizar processos e seus detalhes a partir de seu código;
2. Como usuário eu gostaria de me cadastrar;
3. Como usuário eu gostaria de "favoritar" processos;
4. Como usuário eu gostaria de "desfavoritar" processos;
5. Como usuário eu gostaria de revisitar processos;
6. Como usuário eu gostaria de ver meu histórico de processos pesquisados;
7. Como usuário eu gostaria de visualizar uma timeline das atualizações do processo pesquisado;
8. Como usuário eu gostaria de adicionar filtros na pesquisa;
9. Como usuário eu gostaria de ver referências sobre processos jurídicos;
10. Como usuário eu gostaria de acessar um glossário sobre termos/expressões jurídicos;
 

## Backlog da Sprint:

1 - História 2 (Como usuário eu gostaria de me cadastrar):
  * Instalar e Configurar Prisma [Kayque]
  * Integrar banco de dados [Kayque]
  * Construir página de Login/Cadastro (Layout) [Alex]
  * Implementar Login [Kayque]
  * Implementar Cadastro [Kayque]
  * Implementar recuperação de senha [Kayque]
  * Implementar Logout [Kayque]

2 - História 1 (Como usuário eu gostaria de visualizar processos e seus detalhes a partir de seu código):
  * Implementar integração com a API DataJus (https://datajud-wiki.cnj.jus.br) [Rubens]
  * Construir a Página de pesquisa (Layout) [Mateus]
  * Implementar Pesquisa a partir do código do processo [Rubens]
  * Construir a Página de descrição do processo (Layout) [Alex]

3 - História 3/4 (Como usuário eu gostaria de "favoritar"/"desfavoritar" processos):
  * Construir modelo ds botões e design dos cards [Mateus]
  * Implementar botão de "favoritar"/"desfavoritar" do processo [Rubens]
  * Implementar "cards" dos processos favoritados pelo usuário na página inicial [Rubens]

4 - História 5 (Como usuário eu gostaria de revisitar processos):
  * Redirecionar para a página do processo ao clicar nos cards [Alex]


UMLs Desenvolvidos

![UML 1](https://github.com/Kayross54x/TP---Engenharia-de-software/blob/main/UMLENGSOFT-Página-1.drawio.png "UML 1")

![UML 2](https://github.com/Kayross54x/TP---Engenharia-de-software/blob/main/UMLENGSOFT-Página-2.drawio.png "UML 2")
