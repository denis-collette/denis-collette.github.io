<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Dream</title>
</head>
<body>
    <header>
        <h1>Convert your currency.</h1>
    </header>
    <form method="POST" action="currency.php" id="currency_form">
        <label for="to_convert">How much do you want to convert:</label>
        <input type="number" name="to_convert" step="0.01" min="0.01" onkeypress="if(this.value<0){this.value= this.value * -1}" required/>
        <br/>
        <label for="input_currency">From:</label>
        <select name="input_currency" id="input_currency">
            <option value="EUR" selected="1">Euro - €</option>
            <option value="USD">U.S. Dollar - US$</option>
            <option value="JPY">Japanese Yen - ¥</option>
            <option value="GBP">Sterling - £</option>
            <option value="AUD">Australian Dollar - A$</option>
            <option value="CAD">Canadian Dollar - Can$</option>
            <option value="CHF">Swiss Franc - Fr.</option>
            <option value="HKD">Hong-Kong Dollar - HK$</option>
            <option value="SEK">Swedish Krona - Skr</option>
            <option value="NOK">Norwegian Krone - Nkr</option>
            <option value="INR">Indian Rupee - ₹</option>
            <option value="MXN">Mexican Peso - Mex$</option>
        </select>
        <br/>
        <label for="output_currency">To:</label>
        <select name="output_currency" id="output_currency">
            <option value="EUR">Euro - €</option>
            <option value="USD" selected="1">U.S. Dollar - US$</option>
            <option value="JPY">Japanese Yen - ¥</option>
            <option value="GBP">Sterling - £</option>
            <option value="AUD">Australian Dollar - A$</option>
            <option value="CAD">Canadian Dollar - Can$</option>
            <option value="CHF">Swiss Franc - Fr.</option>
            <option value="HKD">Hong-Kong Dollar - HK$</option>
            <option value="SEK">Swedish Krona - Skr</option>
            <option value="NOK">Norwegian Krone - Nkr</option>
            <option value="INR">Indian Rupee - ₹</option>
            <option value="MXN">Mexican Peso - Mex$</option>
        </select>
        <br/>
        <a href="currency.pĥp">
            <button type="submit">Convert</button>
        </a>
    </form>
</body>
</html>