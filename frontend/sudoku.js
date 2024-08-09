
    // moving the form to center of the page
    let sudoku_grid=document.querySelector(".sudoku_grid")
    sudoku_grid.style.display = "flex"
    sudoku_grid.style.flexDirection = "column"
    sudoku_grid.style.transform = "translate(0%,20%)"

    // adding styles to label
    let label = document.createElement("label")
    label.innerText = "Please Enter the Sudoku Values"
    label.style.alignSelf = "center"
    label.style.marginBottom = "20px"
    label.style.fontSize = "xx-large"
    sudoku_grid.appendChild(label)

    // Creating the sudoku grid
    for ( let i = 1 ; i<=9 ; i++){

        // Creating sudoku rows and adding styles
        let row = document.createElement('div')
        row.setAttribute("id",i)
        row.style.display = "flex"
        row.style.justifyContent = "center"
        for( let j = 1 ; j<=9 ; j++ ){

            // Creating sudoku columns and adding styles
            let ch = document.createElement('input')
            ch.style.width = "40px"
            ch.style.height = "40px"
            ch.style.fontSize = "25px"
            ch.style.textAlign = "center"
            ch.setAttribute("autocomplete","off")
            ch.style.border = "1px solid black"
            ch.setAttribute("inputmode","numeric")

            if ( i == 3 || i == 6 ){
                ch.style.borderBottomWidth = "3px"
                ch.style.borderBottomColor = "blue"
            }
            if ( j == 3 || j == 6 ) {
                ch.style.borderRightWidth = "3px"
                ch.style.borderRightColor = "blue"
            }

            // Handling input from user in the cell
            while(ch.addEventListener( 'input', function(){
                // reads input value
                let s = ch.value
              
                // checks if any value is given is valid or not
                if ( s.length == 1 && ( s[0] <= '0' || s[0] > '9' ) ){
                    alert("Please enter valid digit in range 1 to 9")
                    ch.value=""
                }
                if ( s.length > 1 ){
                    alert("Please enter a valid digit in range 1 to 9 ( both inclusive )")
                    ch.value=s.at(0)
                }
            }));


            row.appendChild(ch)
            }
            sudoku_grid.appendChild(row)
    }

    // Adding button and applying styles to it
    let button = document.createElement('button')
    button.textContent = "Solve"
    button.style.marginTop = "30px"
    button.style.alignSelf = "center"
    button.style.width = "100px"
    button.style.height = "40px"
    button.style.fontSize = "large"
    button.style.backgroundColor = "green"
    button.style.color = "white"
    button.style.border = "none"
    button.setAttribute("type",'button')    // setting the type of button to button

    sudoku_grid.appendChild(button)


    // Button Event Handling
    button.addEventListener('click', function(){
        console.log("button is clicking ")        // Debugging purposes

        // accessing form
        let grid_array = document.querySelector('.sudoku_grid')

        // Creating a 2D array of strings with size 9 * 9 and initial values set to '.'
        let input_array = new Array(9).fill('.').map(() => new Array(9).fill('.'));

        // accessing all rows
        let row = grid_array.querySelectorAll('div')

        // iterating in all rows
        row.forEach( ( element, i ) => {

            // accessing all columns in a row
            let col = element.querySelectorAll('input')

            // iterating all columns in a selected row
            col.forEach( ( ee, j ) =>{

                // checking whether entered input has any value or not. If no is value present the default value willbe present in input_array
                if ( ee.value != '' ){
                    // If it has a value then store it in the input_array
                    input_array[i][j] = ee.value
                }
            })
        })

        // Copying the array to save the original input array for further use
        let copied = input_array.map( row => [...row] )

        // calling the sudoku solver function which tries to solve the sudoku
        if (solveSudoku(copied)){
            let el = document.querySelector('.table')
            if ( el != null ) el.remove()     // Removing the old table if present

            // Adjusting the input table
            sudoku_grid.style.transform = "translate(0%,0%)"
            // Creating new table to display the solution
            let table = document.createElement('table')
            table.setAttribute("class","table")
            table.style.display = "block"

            // Creating statement to inform user about the solution to the sudoku
            let stmt = document.createElement('h2')
            stmt.style.color = "brown"
            stmt.style.textAlign = "center"
            stmt.innerHTML = "Your sudoku is solved. Here is the complete sudoku"
          
            document.body.appendChild(table)
            table.appendChild(stmt)
            for ( let i = 1 ; i<=9 ; i++){

                // Creating sudoku rows and adding styles
                let row = document.createElement('tr')
                row.style.display = "flex"
                row.style.justifyContent = "center"

                for( let j = 1 ; j<=9 ; j++ ){
            
                    // Creating sudoku columns and adding styles
                    let ch = document.createElement('td')
                    ch.style.width = "40px"
                    ch.style.height = "40px"
                    ch.style.fontSize = "25px"
                    ch.style.textAlign = "center"
                    ch.style.border = "1px solid black"
                    ch.innerText = copied[i-1][j-1]      // giving values to each cell/box from output array
                    if ( copied[i-1][j-1] != input_array[i-1][j-1] ) ch.style.color = "red"     // If the value is not present in a cell when input is given, It is displayed in red colour
                    if ( i == 3 || i == 6 ){
                        ch.style.borderBottomWidth = "3px"
                        ch.style.borderBottomColor = "blue"
                    }
                    if ( j == 3 || j == 6 ) {
                        ch.style.borderRightWidth = "3px"
                        ch.style.borderRightColor = "blue"
                    }
                    row.appendChild(ch)
                    }
                    table.appendChild(row)
            }
        }
        else {
            // If entered sudoku values cannot be solved display pop-up
            alert("The Entered Sudoku cannot be solved. Please enter another sudoku")

                // // Clear all the input fields in the Sudoku grid
                // let inputs = document.querySelectorAll('.sudoku_grid input');
                // inputs.forEach(input => {
                //     input.value = '';
                // });
        }
    })

    // function to check duplicate values in a 3*3 square box
    function checkBox(board, j) {
        let m, n;
        if (Math.floor(j / 9) < 3) m = 0;
        else if (Math.floor(j / 9) < 6) m = 3;
        else m = 6;
    
        if (j % 9 < 3) n = 0;
        else if (j % 9 < 6) n = 3;
        else n = 6;
    
        for (let i = 0; i < 3; i++) {
            for (let l = 0; l < 3; l++) {
                if ((i + m) == Math.floor(j / 9) && (l + n) == j % 9) continue;
                if (board[i + m][n + l] == board[Math.floor(j / 9)][j % 9]) return true;
            }
        }
        return false;
    }
    // function to check duplicate values in a row
    function checkRow(board, j) {
        for (let i = 0; i < 9; i++) {
            if (i == j % 9) continue;
            if (board[Math.floor(j / 9)][j % 9] == board[Math.floor(j / 9)][i]) return true;
        }
        return false;
    }
    // function to check duplicate values in a column
    function checkColumn(board, j) {
        for (let i = 0; i < 9; i++) {
            if (i == Math.floor(j / 9)) continue;
            if (board[Math.floor(j / 9)][j % 9] == board[i][j % 9]) return true;
        }
        return false;
    }
    
    function solve(board, i) {
        if (i < 81) {
            if (board[Math.floor(i / 9)][i % 9] == '.') {
                for (let j = 1; j <= 9; j++) {
                    board[Math.floor(i / 9)][i % 9] = String(j);
                    // checks column for duplicate of value j
                    let c = checkColumn(board, i);
                    if (c == false) {
                        // checks row for duplicate of value j
                        c = checkRow(board, i);
                        if (c == false) {
                            // checks 3*3 square box for duplicate of value j
                            c = checkBox(board, i);
                            if (c == false) {
                                c = solve(board, i + 1);
                                if (c == true) return true;
                            }
                        }
                    }
                }
                board[Math.floor(i / 9)][i % 9] = '.';
                return false;
            } else {
                return solve(board, i + 1);
            }
        }
        return true;
    }
    
    function solveSudoku(board) {

        // Checks whether input array has any duplicate values in any row,column or in a square box.
        // If duplicate values present then it cannot be solved. Hence returns false
        for (let i = 0; i < 81; i++) {
            if (board[Math.floor(i / 9)][i % 9] != '.') {
                // checks column for duplicate of value board[Math.floor(i / 9)][i % 9]
                let c = checkColumn(board, i);
                if (c == false) {
                    // checks row for duplicate of value board[Math.floor(i / 9)][i % 9] 
                    c = checkRow(board, i);
                    if (c == false) {
                        // checks 3*3 square box for duplicate of value board[Math.floor(i / 9)][i % 9]
                        c = checkBox(board, i);
                        if (c == true) {
                            return false;
                        }
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
        }
      
        // Otherwise sudoku is solvable and returns true
        solve(board, 0);
        return true;
    }
