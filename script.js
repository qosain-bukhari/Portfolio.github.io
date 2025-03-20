document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Close menu when clicking on menu items
        const menuItems = document.querySelectorAll('.menu li a');
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }
  
    
    // Resume Tabs
    const resumeTabBtns = document.querySelectorAll('.tab-btn');
    const resumeTabContents = document.querySelectorAll('.tab-content');

    if (resumeTabBtns.length > 0 && resumeTabContents.length > 0) {
        resumeTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
                resumeTabBtns.forEach(btn => btn.classList.remove('active'));
                resumeTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            const tabContent = document.getElementById(tabId);
            
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
    }

    // Skills Category Tabs
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categorySkills = document.querySelectorAll('.category-skills');
    
    if (categoryTabs.length > 0 && categorySkills.length > 0) {
        // First hide all skills
        categorySkills.forEach(s => s.classList.remove('active'));
        categoryTabs.forEach(t => t.classList.remove('active'));
        
        // Find and activate software tab immediately
        const softwareTab = document.querySelector('.category-tab[data-category="software"]');
        if (softwareTab) {
            softwareTab.classList.add('active');
            const skillsToShow = document.getElementById('software-skills');
            if (skillsToShow) {
                skillsToShow.classList.add('active');
                // Animate skill bars immediately
                const progressBars = skillsToShow.querySelectorAll('.skill-progress');
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width') || '85%';
                    bar.style.width = width;
                });
            }
        }
        
        // Set up click handlers for future tab changes
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                categoryTabs.forEach(t => t.classList.remove('active'));
                categorySkills.forEach(s => s.classList.remove('active'));
                
                this.classList.add('active');
                
                const category = this.getAttribute('data-category');
                const skillsToShow = document.getElementById(`${category}-skills`);
                if (skillsToShow) {
                    skillsToShow.classList.add('active');
                    const progressBars = skillsToShow.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = bar.getAttribute('data-width') || '85%';
                        }, 50);
                    });
                }
            });
        });
    }
    
    // Animate skill bars on scroll
    const animateSkillBars = () => {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (barPosition < screenPosition) {
                const width = bar.style.width;
                bar.style.width = 0;
                setTimeout(() => {
                    bar.style.width = width;
                }, 50);
            }
        });
    };
    
    // Call once on page load
    setTimeout(animateSkillBars, 500);
    
    // And on scroll
    window.addEventListener('scroll', animateSkillBars);
    
    
    
    // Window resize handling for responsive behavior
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Recalculate and update slider
            updateSlider(false);
        }, 250);
    });

    const viewAllButton = document.getElementById('viewAllProjectsBtn');
    const hiddenProjects = document.querySelectorAll('.hidden-project');

    let projectsVisible = false;

    viewAllButton.addEventListener('click', function() {
        hiddenProjects.forEach(project => {
            project.style.display = projectsVisible ? 'none' : 'block';
        });
        
        viewAllButton.textContent = projectsVisible ? 'View More Projects' : 'Hide Projects';
        projectsVisible = !projectsVisible;
    });

    // Get the logo element
    const logo = document.querySelector('.logo');

    // Add click event listener to the logo
    if (logo) {
        logo.addEventListener('click', function(e) {
            // Prevent default behavior if it's a link
            e.preventDefault();
            
            // Reload the page
            window.location.reload();
            
            // Alternative: You can also redirect to the homepage
            // window.location.href = window.location.origin;
        });
        
        // Add cursor pointer to indicate it's clickable
        logo.style.cursor = 'pointer';
}
});