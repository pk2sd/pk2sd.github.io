$(document).ready(function() {
    $("#calculate").click(function() {
        var basic = $("#basic").val();
        var actual = $("#act-hra").val() || 0.4*basic;
        var rent = $("#rent").val() || 0;
        var hra = Math.min(0.4*basic, actual, rent-0.1*basic);
        hra = Math.max(0,hra);
        var gross = $("#gross").val() || 0;
        var _80c = Math.min(150000, $("#_80cdeductions").val()) || 0;
        var std_deductions = $("#standard_deductions").val() || 0;
        var prof_tax = 2400;
        var taxable = Math.max(0, gross - _80c - std_deductions - hra - prof_tax);
        if(taxable%10<5) taxable = taxable - taxable %10;
        else taxable = taxable - taxable %10 + 10;
        

        var slab1_tax = Math.max(Math.min(taxable - 250000, 250000)*0.05, 0);//from 2.5 lac to 5 lac 5%
        var slab2_tax = Math.max(Math.min(taxable - 500000, 500000)*0.2, 0)//from 5 lac to 10 lac 20%
        var slab3_tax = Math.max((taxable - 1000000)*0.3, 0)//above 10 lac 30%

        var new_slab1_tax = Math.max(Math.min(gross - 500000, 250000)*0.1, 0);//from 5 lac to 7.5 lac 10%
        var new_slab2_tax = Math.max(Math.min(gross - 750000, 250000)*0.15, 0)//from 7.5 lac to 10 lac 15%
        var new_slab3_tax = Math.max(Math.min(gross - 1000000, 250000)*0.2, 0);//from 10 lac to 12.5 lac 20%
        var new_slab4_tax = Math.max(Math.min(gross - 1250000, 250000)*0.25, 0)//from 12.5 lac to 15 lac 25%
        var new_slab5_tax = Math.max((gross - 1500000)*0.3, 0)//above 15 lac 30%

        var total_tax = slab1_tax + slab2_tax + slab3_tax;
        total_tax = Math.round(total_tax + 0.04* total_tax);

        var new_tax = new_slab1_tax + new_slab2_tax + new_slab3_tax + new_slab4_tax + new_slab5_tax;
        if($("#cess").is(":checked")){
            new_tax = 1.04 * new_tax;
        }
        new_tax = Math.round(new_tax);

        if(taxable <= 500000)total_tax = 0;

        var savings = 0;
        savings = total_tax - new_tax;
        
        if(savings>=0){
            $("#change").html("You will save &#8377; " + savings );
        }
        else {
            $("#change").html("You will have to pay &#8377; " + (-savings) + "  more tax" );
        }

        $("#hra").text(hra);
        $("#taxable").text(taxable);
        $("#final-tax").text(total_tax);
        $("#new-tax").text(new_tax);
    });
});