let socket = io();
    let score = Number(localStorage.getItem("money")); // Initial score
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Score: ${score}`;
function spin() {
    const symbols = ['🍇', '🍉', '🍊', '🍋', '🍒']; // Replace these with your desired symbols
    const slotElements = document.querySelectorAll('.slot');
    const betAmount = Number(parseInt(document.getElementById('betAmount').value));
    const resultElement = document.getElementById('result');
   

    if (betAmount <= 0) {
        resultElement.textContent = 'Please enter a valid bet amount.';
        return;
    }
    else if(betAmount > score)
    {
        resultElement.textContent = 'Please enter a valid bet amount.';
        return;
    }

    // Apply spinning animation to slot elements
    slotElements.forEach(slot => {
        slot.classList.add('rotating');
    });

    setTimeout(() => {
        // Remove spinning animation and calculate outcome
        slotElements.forEach(slot => {
            slot.classList.remove('rotating');
            const randomIndex = Math.floor(Math.random() * symbols.length);
            slot.textContent = symbols[randomIndex];
        });

        // Check for win conditions (example: all or two slots showing the same symbol)
        const symbolsArray = Array.from(slotElements).map(slot => slot.textContent);
        const uniqueSymbols = new Set(symbolsArray);

        // Calculate and update score based on outcome
        if (uniqueSymbols.size === 1) {
            const winAmount = Number(betAmount * 10); // Win 10 times the bet amount for all matching symbols
          //  console.log(typeof betAmount)
          //  console.log(typeof winAmount)
            score += (+winAmount) ;
            resultElement.textContent = `Congratulations! You won ${winAmount} coins!`;
        } else if (uniqueSymbols.size === 2) {
            const winAmount = Math.floor(betAmount * 2); // Win 30% of the bet amount for two matching symbols
          //  console.log(typeof betAmount)
         //   console.log(typeof winAmount)

            score += (+winAmount) ;
            resultElement.textContent = `Congratulations! You won ${winAmount} coins!`;
        } else {
            score -= (+betAmount) ; // User loses the bet amount
            resultElement.textContent = `Sorry, you lost ${betAmount} coins. Try again!`;
        }

        // Update and display the user's score
        scoreElement.textContent = `Score: ${score}`;
        localStorage.setItem("money",score);
        socket.emit('update', {'name': localStorage.getItem("user") ,'money': localStorage.getItem("money"), 'id':localStorage.getItem("id")});
    }, 2000); // 2 seconds for the spinning animation
}