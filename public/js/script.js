    
    function testPw(input){
        let message = "";
        if('/.{12}/g'.exec(pwString) == false) message += "Your password must be 12 characters in length. ";
        if('/[A-Z]+/g'.exec(pwString) == false) message += "Your password must contain at least one capital letter. ";
        if('/[\d]+/g'.exec(pwString) == false) message += "Your password must contain at least one roman numeral. ";
        if('/[`~!@#$%^&\*()\-+={}|\\\[\];\'\":,\.<>\?\/\_]/g'.exec(pwString) == false) message += "Your password must contain at least one special character. ";
        return message;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const tableHeaders = document.querySelectorAll('th[data-sortable]');
        tableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortBy = header.dataset.sortable;
                const sortOrder = header.dataset.order || 'asc';
                const table = header.closest('table');
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));

                rows.sort((a, b) => {
                    let aValue = a.querySelector(`td[data-${sortBy}]`).textContent.trim();
                    let bValue = b.querySelector(`td[data-${sortBy}]`).textContent.trim();

                    if (!isNaN(aValue)) aValue = parseFloat(aValue);
                    if (!isNaN(bValue)) bValue = parseFloat(bValue);

                    if (sortOrder === 'asc') {
                        return aValue > bValue ? 1 : -1;
                    } else {
                        return aValue < bValue ? 1 : -1;
                    }
                });

                tbody.innerHTML = '';
                rows.forEach(row => tbody.appendChild(row));

                // Update order
                header.dataset.order = sortOrder === 'asc' ? 'desc' : 'asc';
            });
        });
    });