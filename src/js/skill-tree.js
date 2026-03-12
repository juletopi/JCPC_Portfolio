$(document).ready(function() {
    
    const skillTreeData = {
        frontend: {
            title: "FRONT-END",
            id: "branch-frontend",
            colorClass: "text-danger",
            barColor: "rgb(241, 70, 104)",
            rows: [
                [
                    { name: "HTML5", icon: "devicon-html5-plain", desc: "Estruturação & semântica" },
                    { name: "CSS3", icon: "devicon-css3-plain", desc: "Estilização & layouts" },
                    { name: "JavaScript", icon: "devicon-javascript-plain", desc: "ES6+ & DOM" },
                ],
                [
                    { name: "Bootstrap", icon: "devicon-bootstrap-plain", desc: "Construção de UI responsiva" },
                    { name: "jQuery", icon: "devicon-jquery-plain", desc: "Manipulação DOM" },
                ],
                [
                    { name: "React/React Native", icon: "devicon-react-original", desc: "Componentes & hooks" },
                ]
            ]
        },
        backend: {
            title: "BACK-END",
            id: "branch-backend",
            colorClass: "text-success",
            barColor: "rgb(72, 199, 116)",
            rows: [
                [
                    { name: "Node.js", icon: "devicon-nodejs-plain", desc: "Runtime JavaScript" },
                    { name: "PHP", icon: "devicon-php-plain", desc: "Desenvolvimento Web" },
                    { name: "Laravel", icon: "devicon-laravel-original", desc: "MVC framework PHP" },
                ],
                [
                    { name: "Python", icon: "devicon-python-plain", desc: "Automação & scripting" },
                    { name: "Playwright", icon: "devicon-playwright-plain", desc: "Biblioteca de automação" },
                    { name: "R", icon: "devicon-r-plain", desc: "Análise de dados" },
                ],
                [
                    { name: "C#", icon: "devicon-csharp-plain", desc: "OOP Tipagem avançado" },
                    { name: ".NET Core", icon: "devicon-dotnetcore-plain", desc: ".NET Framework" },
                ],
                [
                    { name: "MySQL", icon: "devicon-mysql-plain", desc: "Banco de dados relacional" },
                    { name: "PostgreSQL", icon: "devicon-postgresql-plain", desc: "Banco de dados relacional" },
                ]
            ]
        },
        productivity: {
            title: "TOOLS & DEVOPS",
            id: "branch-tools",
            colorClass: "text-primary",
            barColor: "rgb(121, 87, 213)",
            rows: [
                [
                    { name: "VS Code", icon: "devicon-vscode-plain", desc: "Editor de código principal" },
                    { name: "Visual Studio", icon: "devicon-visualstudio-plain", desc: "IDE do C# / .NET" },
                    { name: "RStudio", icon: "devicon-rstudio-plain", desc: "IDE do R" },
                ],
                [
                    { name: "Git", icon: "devicon-git-plain", desc: "Controle de versão" },
                    { name: "GitHub", icon: "devicon-github-original", desc: "Repositório & colaboração" },
                    { name: "GitLab", icon: "devicon-gitlab-plain", desc: "DevOps & CI/CD" },
                ],
                [
                    { name: "Azure DevOps", icon: "devicon-azuredevops-plain", desc: "Gerenciamento de tasks" },
                    { name: "Notion", icon: "devicon-notion-plain", desc: "Anotações & documentação" },
                ],
                [
                    { name: "Jupyter", icon: "devicon-jupyter-plain", desc: "Análise de dados" },
                    { name: "Postman", icon: "devicon-postman-plain", desc: "API Testing" },
                ]
            ]
        }
    };

    const treeRoot = $('#skill-tree-root');

    $.each(skillTreeData, function(key, branch) {
        let branchHtml = `
            <div class="col-lg-4 col-md-6 mb-4">
                <div class="skill-branch ${branch.id}">
                    <h3 class="skill-branch-title ${branch.colorClass}">${branch.title}</h3>
        `;

        branch.rows.forEach(function(row) {
            let rowClass = row.length > 1 ? "skill-row multi-item" : "skill-row";
            
            branchHtml += `<div class="${rowClass}">`;

            row.forEach(function(skill) {
                branchHtml += `
                    <div class="skill-node">
                        <i class="${skill.icon}"></i>
                        
                        <div class="skill-tooltip">
                            <span class="tooltip-title" style="color: ${branch.barColor}">${skill.name}</span>
                            <span class="tooltip-level">${skill.desc}</span>
                        </div>
                    </div>
                `;
            });

            branchHtml += `</div>`;
        });

        branchHtml += `
                </div>
            </div>
        `;

        treeRoot.append(branchHtml);
    });
});
