$(document).ready(function() {
    
    const skillTreeData = {
        frontend: {
            title: "FRONT-END",
            id: "branch-frontend",
            colorClass: "text-danger",
            barColor: "rgb(241, 70, 104)",
            rows: [
                [
                    { name: "HTML5", icon: "devicon-html5-plain", desc: "Estruturação" },
                    { name: "CSS3", icon: "devicon-css3-plain", desc: "Estilização & Flexbox" },
                    { name: "JavaScript", icon: "devicon-javascript-plain", desc: "ES6+ & DOM" }
                ],
                [
                    { name: "Bootstrap", icon: "devicon-bootstrap-plain", desc: "UI Responsiva & Estilização Rápida" },
                    { name: "JQuery", icon: "devicon-jquery-plain", desc: "Manipulação Simplificada" }
                ],
                [
                    { name: "React", icon: "devicon-react-original", desc: "Componentes & Hooks" }
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
                    { name: "Python", icon: "devicon-python-plain", desc: "Automação & Scraping" },
                    { name: "PHP", icon: "devicon-php-plain", desc: "Web Development" },
                    { name: "C#", icon: "devicon-csharp-plain", desc: ".NET Core" }
                ],
                [
                    { name: "Laravel", icon: "devicon-laravel-original", desc: "MVC Framework" }
                ],
                [
                    { name: "MySQL", icon: "devicon-mysql-plain", desc: "Queries & Relational" }
                ]
            ]
        },
        productivity: {
            title: "TOOLS/PROD",
            id: "branch-tools",
            colorClass: "text-primary",
            barColor: "rgb(121, 87, 213)",
            rows: [
                [
                    { name: "Git", icon: "devicon-git-plain", desc: "Version Control" },
                    { name: "GitHub", icon: "devicon-github-original", desc: "Repo Hosting $ Colaboração" }
                ],
                [
                    { name: "VS Code", icon: "devicon-vscode-plain", desc: "Editor Principal" },
                    { name: "Visual Studio", icon: "devicon-visualstudio-plain", desc: "C# IDE" }
                ],
                [
                    { name: "Windows", icon: "devicon-windows11-original", desc: "OS Principal" },
                    { name: "Linux", icon: "devicon-linux-plain", desc: "Ubuntu" }
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
