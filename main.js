const work_experience = async () => {
    try{
        const response = await fetch("./portfolio-data.json");
        const data = await response.json();
        console.log("Number of experience found:", data.experiences.length);

        const container = document.getElementById("experience-container");

        container.innerHTML = data.experiences.map((exp, index, array) => {
            const isCurrent = exp.endDate === "PRESENT";
            const isHighlightedStyle = isCurrent ? "background-color: var(--color-primary); color: var(--color-on-primary);" : "background-color: var(--container-bg-color)";
            const isHighlightedListStyle = isCurrent ? "listHighlighted" : "";
            const isLast = index === array.length - 1;

            return `
                <div class="flex flex-row gap-6 w-[400px] md:w-[900px]">
                    <div class="flex flex-col items-center mt-[34px] relative shrink-0">
                        <img src="asset/flower-button-light.png" width="32px" class="dark:hidden min-h-[32px]" style="z-index: 2;">
                        <img src="asset/flower-button-dark.png" width="32px" class="hidden dark:block min-h-[32px]" style="z-index: 2;">

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
        console.log("Number of activity found:", data.activities.length);

        const container = document.getElementById("activity-container");

        container.innerHTML = data.activities.map((activity, index, array) => {
            const isCurrent = activity.endDate === "PRESENT";
            const isHighlightedStyle = isCurrent ? "background-color: var(--color-primary); color: var(--color-on-primary);" : "background-color: var(--container-bg-color)";
            const isHighlightedListStyle = isCurrent ? "listHighlighted" : "";
            const isLast = index === array.length - 1;

            return `
                <div class="flex flex-row gap-6 w-[400px] md:w-[900px]">
                    <div class="flex flex-col items-center mt-[34px] relative">
                        <img src="asset/button-lightmode.png" width="32px" class="dark:hidden min-h-[32px]" style="z-index: 2;">
                        <img src="asset/button-darkmode.png" width="32px" class="hidden dark:block min-h-[32px]" style="z-index: 2;">

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
        console.log("Number of project found:", data.projects.length);

        const container = document.getElementById("project-container");

        container.innerHTML = data.projects.map(project => `
            <div class="project-card flex flex-col p-5 rounded-[20px] border-[2px]" style="background-color: var(--container-bg-color); border-color: var(--color-primary); cursor: pointer;" onclick="window.location.href='project-detail.html?title=${encodeURIComponent(project.path)}'">
                <img src="${project.projectLogo}" alt="${project.title}" class="rounded-[8px]">
                <h2 class="mt-[16px]" style="font-size: 20px"><b>${project.title}</b></h2>
                <p class="line-clamp-5 mt-[8px]">${project.description}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error("Error fetching all project data:", error);
    }
};

const project_details = async () => {
    // TODO: Buat page/file baru khusus detail project, figure out apakah github bisa fleksibel buat url path nya soalnya github hanya bisa static, kemungkinan perlu beberapa foto (array) bole pake cdn nya bootstrap utk carousel nya.
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

            document.getElementById("my-role").innerText = `${project.myRole}`;
            document.getElementById("my-stack").innerText = project.techStacks.join(', ');
            document.getElementById("project-duration").innerHTML = `${project.startDate} &#x2013; ${project.endDate}`;

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
                    <a href="#slide${index + 1}" class="btn btn-xs" style="background-color: var(--container-bg-color); color: var(--color-primary); border-color: var(--color-primary);">
                        ${index + 1}
                    </a>
                `).join('');

                carouselImg.innerHTML = slideImg;
                carouselNav.innerHTML = slideNav;
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
                allowfullscreen></iframe>`;
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

work_experience();
all_activity();
all_project();
project_details();