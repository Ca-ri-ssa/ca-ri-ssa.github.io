const work_experience = async () => {
    try{
        const response = await fetch("./portfolio-data.json");
        const data = await response.json();
        console.log("Number of experience found:", data.experiences.length);

        const container = document.getElementById("experience-container");

        container.innerHTML = data.experiences.map((exp, index, array) => {
            const isCurrent = exp.endDate === "PRESENT";
            const isHighlightedStyle = isCurrent ? "background-color: var(--color-primary); color: var(--color-on-primary);" : "background-color: var(--container-bg-color)";
            const isLast = index === array.length - 1;

            // TODO: Ganti icon untuk timeline
            return `
                <div class="flex flex-row gap-6 w-[400px] md:w-[900px]">
                    <div class="flex flex-col items-center mt-[34px] relative shrink-0">
                        <img src="asset/android-logo.svg" width="20px" class="min-h-[20px]" style="z-index: 2;">
                        <div class="rounded-xl flex grow" style="position: absolute; top: 28px; bottom: -56px; width: 2px; background-color: var(--color-primary); z-index: 1; width: 2px; background-color: var(--color-primary); ${isLast ? 'display: none;' : ''}"></div>
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
                        <p class="mt-[16px]"><strong>Description:</strong> ${exp.description}</p>
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
            const isLast = index === array.length - 1;

            // TODO: Ganti icon untuk timeline, isi (sisa deskripsi organisasi)
            return `
                <div class="flex flex-row gap-6 w-[400px] md:w-[900px]">
                    <div class="flex flex-col items-center mt-[34px] relative">
                        <img src="asset/android-logo.svg" width="20px" class="min-h-[20px]" style="z-index: 2;">
                        <div class="rounded-xl flex grow" style="position: absolute; top: 28px; bottom: -56px; width: 2px; background-color: var(--color-primary); z-index: 1; width: 2px; background-color: var(--color-primary); ${isLast ? 'display: none;' : ''}"></div>
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
                        <p class="mt-[16px]"><strong>Description:</strong> ${activity.description}</p>
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
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="${project.title}" class="rounded-[8px]">
                <!-- <img src="${project.projectImg}" alt="${project.title}" class="rounded-[8px]"> -->
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

            document.getElementById("project-logo").src = "https://images.unsplash.com/photo-1774287784592-33f86f48e7e2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
            document.getElementById("project-logo").alt = `${project.title} logo`;
            document.getElementById("project-logo").title = project.title;

            document.getElementById("my-role").innerText = `${project.myRole}`;
            document.getElementById("project-duration").innerHTML = `${project.startDate} &#x2013; ${project.endDate}`;
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