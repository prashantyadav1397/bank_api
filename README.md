# Bank API

Hosting URL: https://bankrestfulapi.herokuapp.com/

## Routes<br>
## Default route --- /<br>

## Banks Route<br>

<li>get all banks --- /api/banks/all </li> <br>

## Branches Routes<br>

<li>get all bank branches data --- /api/branches/all </li> <br>
<li>get branches information using autocomplete branch name ---  /api/branches/autocomplete/branch/:branch/limit/:limit </li> <br>
<li>get a bank detail based on the IFSC code --- /api/branches/autocomplete/branch/ifsc/:ifsc/all </li><br>
<li>get a single bank detail based on the IFSC code --- /api/branches/autocomplete/branch/ifsc/:ifsc </li> <br>
<li>get all branches for a given city --- /api/branches/cities/city/:city </li> <br>
<li>get branches information using city name and limit --- /api/branches/city/:city/limit/:limit </li> <br>
<li>get distinct branch names --- /api/branches/branch </li> <br>
<li>get distinct city --- /api/branches/cities </li> <br>
<li>get distinct city --- /api/branches/ifsc </li> <br>
