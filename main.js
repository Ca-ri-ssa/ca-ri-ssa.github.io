import { CONFIG } from "./config.js" ;

const savedTheme = localStorage.getItem("theme");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

const isDark = savedTheme === "dark" || (!savedTheme && systemTheme);
document.documentElement.classList.toggle("dark", isDark);
document.documentElement.setAttribute("data-theme", isDark? "dark" : "light");

window.addEventListener('DOMContentLoaded', () => {
        const themeIcon = document.getElementById("theme-icon");

        if(themeIcon) {
            const isThemeIcon = isDark ? "asset/ic-darkmode.svg" : "asset/ic-lightmode.svg";
            themeIcon.setAttribute("href", isThemeIcon);
        }

        if(document.getElementById("toogle-theme")) {
            change_theme();
        }
});

const change_theme = () => {
    const toogleBtn = document.getElementById("toogle-theme");
    const themeIcon = document.getElementById("theme-icon");

    if(toogleBtn) {
        toogleBtn.addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";

            const newTheme = isDark? "light" : "dark";

            document.documentElement.classList.toggle("dark", newTheme === "dark");
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);

            if (themeIcon) {
                const updateIcon = newTheme === "dark" ? "asset/ic-darkmode.svg" : "asset/ic-lightmode.svg";
                themeIcon.setAttribute("href", updateIcon);
            }
        });
    }
};

const skill_set = async () => {
    try {
        const response = await fetch("./portfolio-data.json");
        const data = await response.json();
        const skill = data.mySkills;

        const skillSet = document.getElementById("skills-set");

        skillSet.innerHTML = skill.map(s => `
            <a href="${s.link}" class="skills">
                <svg style="color: var(--color-primary); fill: currentColor; width: 24px; height: 24px;" viewBox="0 0 40 40">
                    <use href="${s.icon}"></use>
                </svg>
                <p>${s.name}</p>
            </a>
        `).join('');
    } catch (error) {
        console.error("Error fetching featured skills data:", error);
    }
};

const work_experience = async () => {
    try{
        const response = await fetch("./portfolio-data.json");
        const data = await response.json();

        const container = document.getElementById("experience-container");

        container.innerHTML = data.experiences.map((exp, index, array) => {
            const isCurrent = exp.endDate === "PRESENT";
            const isHighlightedStyle = isCurrent ? "background-color: var(--color-primary); color: var(--color-on-primary);" : "background-color: var(--container-bg-color)";
            const isHighlightedListStyle = isCurrent ? "listHighlighted" : "";
            const isLast = index === array.length - 1;

            return `
                <div class="flex flex-row gap-6 w-[400px] md:w-[900px]">
                    <div class="flex flex-col items-center mt-[34px] relative shrink-0">
                        <img width="32px" class="min-h-[32px]" style="content: var(--flower-button-image); z-index: 2;">

                        <div class="rounded-xl flex grow" style="position: absolute; top: 40px; bottom: -58px; width: 2px; background-color: var(--color-primary); z-index: 1; width: 2px; background-color: var(--color-primary); ${isLast ? 'display: none;' : ''}"></div>
                    </div>
                    <div class="json-list px-8 py-6 rounded-[20px] border-[2px] flex-1" style="${isHighlightedStyle}; border-color: var(--color-primary);">
                        <div class="flex flex-row justify-between items-center">
                            <h2 class="me-[8px] md:me-0" style="font-size: 20px;"><b>${exp.title}</b></h2>
                            <p style="font-size: 14px;">${exp.startDate} &#x2013; ${isCurrent ? `<b>${exp.endDate}</b>` : exp.endDate}</p>
                        </div>
                        <div class="flex flex-row gap-2 items-center">
                            <p style="font-size: 14px;">${exp.place}</p>
                            <p>&bull;</p>
                            <p style="font-size: 14px;">${exp.type}</p>
                        </div>
                        <div class="flex flex-row justify-start items-center gap-2 mt-2">
                            <img src="${exp.companyImg}" alt="${exp.company} logo" title="${exp.company}" class="rounded-[4px] w-[24px] bg-center bg-cover">
                            <a href="${exp.companyLink}" class="hover:underline hover:underline-offset-4">${exp.company}</a>
                        </div>
                        <p class="mt-[16px]"><strong>Description:</strong></p>
                        <ul class="${isHighlightedListStyle}">${exp.description}</ul>
                        <div class="flex flex-row mt-[16px] flex-wrap gap-1">
                            ${exp.skills.map(skill => `
                                <div class="py-[4px] px-[6px]" style="border-radius: 8px; border: 2px solid var(--color-primary); background-color: var(--container-bg-color); color: var(--color-primary); font-size: 12px;">${skill}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Error fetching work experience data:", error);
    }
};

const all_activity = async () => {
    try {
        const response = await fetch("./portfolio-data.json");
        const data = await response.json();

        const container = document.getElementById("activity-container");

        container.innerHTML = data.activities.map((activity, index, array) => {
            const isCurrent = activity.endDate === "PRESENT";
            const isHighlightedStyle = isCurrent ? "background-color: var(--color-primary); color: var(--color-on-primary);" : "background-color: var(--container-bg-color)";
            const isHighlightedListStyle = isCurrent ? "listHighlighted" : "";
            const isLast = index === array.length - 1;

            return `
                <div class="flex flex-row gap-6 w-[400px] md:w-[900px]">
                    <div class="flex flex-col items-center mt-[34px] relative">
                        <img width="32px" class="min-h-[32px]" style="content: var(--round-button-image); z-index: 2;">

                        <div class="rounded-xl flex grow" style="position: absolute; top: 40px; bottom: -58px; width: 2px; background-color: var(--color-primary); z-index: 1; width: 2px; background-color: var(--color-primary); ${isLast ? 'display: none;' : ''}"></div>
                    </div>
                    <div class="json-list px-8 py-6 rounded-[20px] border-[2px] flex-1" style="${isHighlightedStyle}; border-color: var(--color-primary);">
                        <div class="flex flex-row justify-between items-center">
                            <h2 class="me-[8px] md:me-0" style="font-size: 20px;"><b>${activity.title}</b></h2>
                            <p style="font-size: 14px;">${activity.startDate} &#x2013; ${isCurrent ? `<b>${activity.endDate}</b>` : activity.endDate}</p>
                        </div>
                        <p style="font-size: 14px;">${activity.type}</p>
                        <div class="flex flex-row justify-start items-center gap-2 mt-2">
                            <img src="${activity.organizationImg}" alt="${activity.organization} logo" title="${activity.organization}" class="rounded-[4px] w-[24px] bg-center bg-cover">
                            <a href="${activity.organizationLink}" class="hover:underline hover:underline-offset-4">${activity.organization}</a>
                        </div>
                        <p class="mt-[16px]"><strong>Description:</strong></p>
                        <ul class="${isHighlightedListStyle}">${activity.description}</ul>
                        <div class="flex flex-row mt-[16px] flex-wrap gap-1">
                            ${activity.skills.map(skill => `
                                <div class="py-[4px] px-[6px]" style="border-radius: 8px; border: 2px solid var(--color-primary); background-color: var(--container-bg-color); color: var(--color-primary); font-size: 12px;">${skill}</div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Error fetching activity data:", error);
    }
};

const all_project = async () => {
    try {
        const response = await fetch("./portfolio-data.json");
        const data = await response.json();

        const container = document.getElementById("project-container");

        container.innerHTML = data.projects.map(project => `
            <a href="project-detail.html?title=${encodeURIComponent(project.path)}" class="card flex flex-col p-5 rounded-[20px] border-[2px]" style="background-color: var(--container-bg-color); border-color: var(--color-primary);"">
                <img src="${project.projectLogo}" alt="${project.title}" class="rounded-[12px]">
                <h2 class="mt-[16px] hover:underline hover:underline-offset-4" style="font-size: 20px"><b>${project.title}</b></h2>
                <p class="line-clamp-5 mt-[8px]">${project.description}</p>
            </a>
        `).join('');
    } catch (error) {
        console.error("Error fetching all project data:", error);
    }
};

const project_details = async () => {
    const param = new URLSearchParams(window.location.search);
    const projectTitle = param.get("title");

    try {
        const response = await fetch("./portfolio-data.json");
        const data = await response.json();

        const project = data.projects.find(p => p.path === projectTitle);

        if(project) {
            const title = document.querySelectorAll(".title-detail");

            title.forEach(el => {
                el.innerText = project.title
            });

            document.getElementById("project-logo").src = project.projectLogo;
            document.getElementById("project-logo").alt = `${project.title} logo`;
            document.getElementById("project-logo").title = project.title;
            console.log("Project title:", project.title);

            document.getElementById("my-role").innerText = project.myRole;
            document.getElementById("my-stack").innerText = project.techStacks.join(', ');
            document.getElementById("project-duration").innerHTML = `${project.startDate} &#x2013; ${project.endDate}`;

            document.getElementById("link-container").innerHTML = project.projectLink.map(link => `
                <a href="${link.url}" class="hover:underline hover:underline-offset-4">${link.name}</a>
            `).join(', ');

            document.getElementById("project-desc").innerHTML = project.description;

            const carouselImg = document.getElementById("carousel-img");
            const carouselNav = document.getElementById("carousel-nav");

            if(project.projectImg && project.projectImg.length > 0) {
                const slideImg = project.projectImg.map((imgSrc, index) => `
                <div id="slide${index + 1}" class="carousel-item relative w-full">
                    <img src="asset/img_project/${imgSrc}" class="w-full object-cover" />
                </div>
                `).join('');

                const slideNav = project.projectImg.map((_, index) => `
                    <a href="#slide${index + 1}" class="btn btn-xs nav-indicator ${index === 0 ? 'active-indicator' : ''}">
                        ${index + 1}
                    </a>
                `).join('');

                carouselImg.innerHTML = slideImg;
                carouselNav.innerHTML = slideNav;

                const navButtons = carouselNav.querySelectorAll('.nav-indicator');
                navButtons.forEach(btn => {
                    btn.addEventListener('click', () => {
                        carouselNav.querySelector('.active-indicator')?.classList.remove('active-indicator');
                        btn.classList.add('active-indicator');
                    });
                });
            } else {
                document.getElementById("title-project-img").style.display = "none";
                document.getElementById("project-img").style.display = "none";
            }

            if(project.projectDemo) {
                document.getElementById("project-demo").innerHTML = `
                <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube-nocookie.com/embed/${project.projectDemo}" title="YouTube video player" 
                frameborder="0" allow="accelerometer; 
                autoplay; 
                clipboard-write; 
                encrypted-media; 
                gyroscope; 
                picture-in-picture; 
                web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                class="rounded-[20px]"></iframe>`;
            } else {
                document.getElementById("title-project-demo").style.display = "none";
                document.getElementById("project-demo").style.display = "none";
            }
        } else {
            title.forEach(el => {
                el.innerText = "Project Not Found"
            });
        }
    } catch (error) {
        console.error("Error fetching project details data:", error);
    }
};

const all_education = async () => {
    try {
        const response = await fetch("./portfolio-data.json");
        const data = await response.json();
        
        const container = document.getElementById("education-container");

        container.innerHTML = data.educations.map((education, index, array) => {
            const isCurrent = education.endDate === "PRESENT";
            const isHighlightedStyle = isCurrent ? "background-color: var(--color-primary); color: var(--color-on-primary);" : "background-color: var(--container-bg-color)";
            const isHighlightedListStyle = isCurrent ? "listHighlighted" : "";
            const isLast = index === array.length - 1;
            const isDescExist = education.description && education.description.length > 0 ? "" : "display: none;";
            const isGradeExist = education.grade && education.grade.length > 0 ? "" : "display: none;";

            return `
                <div class="flex flex-row gap-6 w-[400px] md:w-[900px]">
                    <div class="flex flex-col items-center mt-[34px] relative">
                        <img width="32px" class="min-h-[32px]" style="content: var(--button-image); z-index: 2;">

                        <div class="rounded-xl flex grow" style="position: absolute; top: 40px; bottom: -58px; width: 2px; background-color: var(--color-primary); z-index: 1; width: 2px; background-color: var(--color-primary); ${isLast ? 'display: none;' : ''}"></div>
                    </div>
                    <div class="json-list px-8 py-6 rounded-[20px] border-[2px] flex-1" style="${isHighlightedStyle}; border-color: var(--color-primary);">
                        <div class="flex flex-row justify-between items-center">
                            <h2 class="me-[8px] md:me-0" style="font-size: 20px;"><b>${education.school}</b></h2>
                            <p style="font-size: 14px;">${education.startDate} &#x2013; ${isCurrent ? `<b>${education.endDate}</b>` : education.endDate}</p>
                        </div>
                        <p style="font-size: 14px;">${education.major}</p>
                        <div class="flex flex-row justify-start items-center gap-2 mt-2">
                            <img src="${education.schoolImg}" alt="${education.school} logo" title="${education.school}" class="rounded-[4px] w-[24px] bg-center bg-cover">
                            <a href="${education.schoolLink}" class="hover:underline hover:underline-offset-4">${education.school}</a>
                        </div>
                        <div class="flex flex-row justify-start items-center gap-2 mt-[16px]">
                            <p>Degree: ${education.degree}</p>
                            <p style="${isGradeExist}">&bull;</p>
                            <p style="${isGradeExist}">Grade: ${education.grade}</p>
                        </div>
                        <div class="mt-[16px]" style="${isDescExist}">
                            <p><strong>Description:</strong></p>
                            <ul class="${isHighlightedListStyle}">${education.description}</ul>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error("Error fetching all education data:", error);
    }
};

const all_certificate = async () => {
    try {
        const response = await fetch("./portfolio-data.json");
        const data = await response.json();
        const currentYear = new Date().getFullYear();
    
        const validCert = data.certifications.filter(cert => {
            if (!cert.expirationDate) return true;
            const match = cert.expirationDate.match(/\d{4}/);
            if(match) {
                const year = parseInt(match[0]);
                return year >= currentYear;
            }
            return true;
        });

        const totalCert = validCert.length;
        document.getElementById("total-cert").innerText = ` (${totalCert})`;

        let showAllCert = false;

        const displayCert = () => {
            const certToShow = showAllCert ? validCert : validCert.slice(0, 6);

            const container = document.getElementById("certificate-container");
            container.innerHTML = certToShow.map(cert => `
                <a href="${cert.credentialUrl}" class="card flex flex-col p-5 rounded-[20px] border-[2px]" style="background-color: var(--container-bg-color); border-color: var(--color-primary)">
                    <h2 class="hover:underline hover:underline-offset-4" style="font-size: 20px; font-weight: bold;">${cert.title}</h2>
                    <p class="flex-grow">${cert.issuer}</p>
                    <p class="text-end mt-[8px]" style="font-size: 14px;">${cert.issueDate}${cert.expirationDate ? ` &#x2013; ${cert.expirationDate}` : ''}</p>
                </a>
            `).join('');
        };

        const showAllBtn = document.getElementById("show-btn-cert");
        
        if(validCert.length > 6) {
            showAllBtn.addEventListener("click", () => {
                showAllCert = !showAllCert;
                showAllBtn.innerText = showAllCert ? "Show Less" : "Show All";
                displayCert();
            });
        } else {
            showAllBtn.style.display = "none";
        }

        displayCert();
    } catch (error) {
        console.error("Error fetching all certificate data:", error);
    }
};

const contact_form = () => {
    const form = document.getElementById('form');
    const result = document.getElementById('result');
    document.getElementById('api_key').value = CONFIG.API_KEY_W3FORMS;

    form.addEventListener('submit', function(e) {
        const formData = new FormData(form);
        e.preventDefault();

        const name = formData.get('name');
        const subject = `Carissa Chandra's Portfolio - ${name} send you a new message via Web3Forms`;
        formData.append('subject', subject);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        result.innerHTML = "Please wait..."

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = json.message;
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                result.style.color = "var(--color-error)";
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
                    result.style.display = "none";
                }, 3000);
            });
    });
};

const footerCopyright= document.getElementById("footer-copyright");
const currentYear = new Date().getFullYear();
footerCopyright.innerHTML = `&copy; ${currentYear} &bull; Carissa Chandra. All rights are reserved.`;

skill_set();
work_experience();
all_activity();
all_project();
project_details();
all_education();
all_certificate();
contact_form();