<?php 

    $EUR = 1;
    $USD = 1.039;
    $JPY = 1.9558;
    $GBP = 0.83313;
    $AUD = 1.6591;
    $CAD = 1.4844;
    $CHF = 0.9421;
    $HKD = 8.0926;
    $SEK = 11.2815;
    $NOK = 11.7145;
    $INR = 90.3771;
    $MXN = 21.4383;

    function convert(){
        if(isset($_POST['to_convert'])) {
            $to_convert = $_POST['to_convert'];
            $input_currency = $_POST['input_currency'];
            $output_currency = $_POST['output_currency'];

            $EUR = 1;
            $USD = 1.039;
            $JPY = 1.9558;
            $GBP = 0.83313;
            $AUD = 1.6591;
            $CAD = 1.4844;
            $CHF = 0.9421;
            $HKD = 8.0926;
            $SEK = 11.2815;
            $NOK = 11.7145;
            $INR = 90.3771;
            $MXN = 21.4383;

            $change = $$output_currency;
            
            echo "Convert " . $to_convert . " " . $input_currency . " to " . $output_currency . ".<br/>";

            if ($input_currency == $output_currency) {
                echo "You choose the same currency.<br>";
            } else if ($input_currency == "EUR") {
                $converted = $to_convert * $change;
                echo "This is equal to: " . round($converted, 2) . " " . $output_currency . ".<br/>";
            } else {
                $converted = $to_convert / $$input_currency * $change;
                echo "This is equal to: " . round($converted, 2) . " " . $output_currency . ".<br/>";
            }
        };
        echo "<br/>";
    };
    convert();
?>
<html>
    <a href="./index.php"><button>Back</button></a>
</html>