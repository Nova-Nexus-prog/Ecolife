document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.querySelector('.card-grid');
    const searchInput = document.getElementById('search-input');
    const filterButtons = document.querySelectorAll('.filter-button');
 

    // Example projects data (replace with your actual data)
    const projects = [
        { title: 'Intro to JavaScript', author: 'John Doe', date: '2024-09-15', type: 'video' },
        { title: 'Advanced CSS Techniques', author: 'Jane Smith', date: '2024-09-10', type: 'book' },
        { title: 'Understanding Web Accessibility', author: 'Sam White', date: '2024-08-25', type: 'seminar' },
        { title: 'React for Beginners', author: 'Alice Brown', date: '2024-09-05', type: 'video' },
        { title: 'Mastering Python', author: 'Jake Black', date: '2024-09-12', type: 'book' },
        // Add more project objects here
    ];

    // Function to determine icon and button text based on type
    function getCardContentByType(type) {
        switch(type) {
            case 'video':
                return {
                    icon: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd"/></svg>`,
                    buttonText: 'View Video'
                };
            case 'book':
                return {
                    icon: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"/></svg>`,
                    buttonText: 'Read Book'
                };
            case 'seminar':
                return {
                    icon: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"/></svg>`,
                    buttonText: 'Join Seminar'
                };
            case 'article':
                return {
                    icon: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7h1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z"/></svg>`,
                    buttonText: 'Read Article'
                };
            default:
                return {
                    icon: `<svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M21.7 8.037a4.26 4.26 0 0 0-.789-1.964 2.84 2.84 0 0 0-1.984-.839c-2.767-.2-6.926-.2-6.926-.2s-4.157 0-6.928.2a2.836 2.836 0 0 0-1.983.839 4.225 4.225 0 0 0-.79 1.965 30.146 30.146 0 0 0-.2 3.206v1.5a30.12 30.12 0 0 0 .2 3.206c.094.712.364 1.39.784 1.972.604.536 1.38.837 2.187.848 1.583.151 6.731.2 6.731.2s4.161 0 6.928-.2a2.844 2.844 0 0 0 1.985-.84 4.27 4.27 0 0 0 .787-1.965 30.12 30.12 0 0 0 .2-3.206v-1.516a30.672 30.672 0 0 0-.202-3.206Zm-11.692 6.554v-5.62l5.4 2.819-5.4 2.801Z" clip-rule="evenodd"/></svg>`,
                    buttonText: 'Download'
                };
        }
    }

    function createCard(project) {
        const card = document.createElement('div');
        card.classList.add('card');
        const { icon, buttonText } = getCardContentByType(project.type);
        
        card.innerHTML = `
            <div class="icon">${icon}</div>
            <h3>${project.title}</h3>
            <p>by ${project.author} <br><br> ${project.date}</p>
            <button class="button">${buttonText}</button>
        `;

        cardGrid.appendChild(card);
    }

    function filterProjects(searchTerm = '') {
        cardGrid.innerHTML = '';

        const filteredProjects = projects
            .filter(project => {
                return (selectedFilter === 'all' || project.type === selectedFilter) &&
                       (project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.author.toLowerCase().includes(searchTerm.toLowerCase()));
            });

        filteredProjects.forEach(project => createCard(project));
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            selectedFilter = button.getAttribute('name');
            
            filterProjects(); // Include search term when filtering
        });
    });

    // Search functionality
    document.getElementById("go").addEventListener("click",()=>{
        filterProjects(searchInput.value)
    })

    let selectedFilter = 'all';
    filterProjects();
});

// Request permission for notifications
 

// Function to show a notification
 
// Attach the function to the contribute button
document.getElementById('contribute-btn').addEventListener('click', () => {
     
     if(sessionStorage.getItem("username"))
     {
        window.location.href="resource_input.html"
     }
     else{
         alert("You have to log in first!")
        
     }
});

