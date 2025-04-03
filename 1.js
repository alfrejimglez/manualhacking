async function loadCommands() {
    const response = await fetch('1.json'); 
    const data = await response.json();
    const contentDiv = document.getElementById('content');

    // Limpiarloqhay
    contentDiv.innerHTML = '';

    for (const [phase, commands] of Object.entries(data)) {
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3');

        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.innerHTML = `<strong style="color: red;">${phase}</strong>`;
        card.appendChild(cardHeader);

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        commands.forEach(cmd => {
            const commandTitle = document.createElement('h5');
            commandTitle.innerHTML = `<strong>${cmd.title}</strong>`;
            const commandCode = document.createElement('pre');
            commandCode.textContent = cmd.command;
            const commandDesc = document.createElement('p');
            commandDesc.textContent = cmd.description;

            cardBody.appendChild(commandTitle);
            cardBody.appendChild(commandCode);
            cardBody.appendChild(commandDesc);
        });

        card.appendChild(cardBody);
        contentDiv.appendChild(card);
    }
}

function filtro() {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        const title = card.querySelector('.card-header').textContent.toLowerCase();
        const commands = card.querySelectorAll('h5, pre, p');
        let isMatch = title.includes(searchValue);

        commands.forEach(command => {
            if (command.textContent.toLowerCase().includes(searchValue)) {
                isMatch = true;
            }
        });

        if (isMatch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

loadCommands();