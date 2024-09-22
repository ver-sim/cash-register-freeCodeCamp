let price = 3.26;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.10],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];
const cashInput = document.getElementById('cash');
const showChangeDue = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const displayCid = document.getElementById('cash-in-drawer');

displayCid.innerHTML = cid.map((money) => `<p>${money.join(': $')}</p>`).join(' ');


const cashRegister = () => {
    let changeDue = Number((cashInput.value- price).toFixed(2));
    const totalCid = Number(cid.reduce((tot, sum) => tot + sum[1], 0).toFixed(2));
    const valueMoney = [
        ['ONE HUNDRED', 100],
        ['TWENTY', 20],
        ['TEN', 10],
        ['FIVE', 5],
        ['ONE', 1],
        ['QUARTER', 0.25],
        ['DIME', 0.1],
        ['NICKEL', 0.05],
        ['PENNY', 0.01]
      ];
    let reverseCid = cid.reverse();
    let changeDueArr = [];
    let updateCid;
    
    if (parseFloat(cashInput.value) < price) {
        alert('Customer does not have enough money to purchase the item');
        cashInput.value = '';
        return;
    } else if (parseFloat(cashInput.value) === price) {
        showChangeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>';
        cashInput.value = '';
        return;
    }else if (changeDue > totalCid) {
        showChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
        cashInput.value = '';
        return;
    } 

    for (let i = 0; i < valueMoney.length; i++) {
        let totalValue = 0;

        while (changeDue >= valueMoney[i][1] && reverseCid[i][1] > 0) {
            reverseCid[i][1] -= valueMoney[i][1];
            changeDue = Number((changeDue - valueMoney[i][1]).toFixed(2));
            totalValue += valueMoney[i][1];
        }
        
        if (totalValue > 0) {
            changeDueArr.push([valueMoney[i][0], totalValue]);
        }
    }
    
    updateCid = Number(reverseCid.reduce((tot, sum) => tot + sum[1], 0).toFixed(2));
        
    if (changeDue > 0) {
        console.log('hei')
        showChangeDue.innerHTML = '<p>Status: INSUFFICIENT_FUNDS</p>';
    } else if ( updateCid === changeDue && price < parseFloat(cashInput.value)) {
        showChangeDue.innerHTML = `<p>Status: CLOSED</p>
         ${changeDueArr.map((change) => `<p>${change.join(': $')}</p>`).join(' ')}`;
         displayCid.innerHTML = reverseCid.reverse().map((money) => `<p>${money.join(': $')}</p>`).join(' ');
    } else if (updateCid > changeDue ) {
        showChangeDue.innerHTML = `<p>Status: OPEN</p> 
        ${changeDueArr.map((change) => `<p>${change.join(': $')}</p>`).join(' ')}`;
        displayCid.innerHTML = reverseCid.reverse().map((money) => `<p>${money.join(': $')}</p>`).join(' ');
    }
    cashInput.value = '';
};

purchaseBtn.addEventListener('click', cashRegister);

cashInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        cashRegister();
    }
});