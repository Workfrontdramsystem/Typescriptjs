import { renderBlock } from './lib.js'

export function renderSearchFormBlock (checkin: Date, checkout?: Date) : void {
  const selectedCheckin =  checkin.getFullYear()+'-0'+(checkin.getMonth()+1)+'-'+checkin.getDate();

  let selectedCheckout = '';
  if (checkout)
  {
    selectedCheckout =  checkout.getFullYear()+'-0'+(checkout.getMonth()+1)+'-'+checkout.getDate();
  }
  else{
    checkin.setDate(checkin.getDate()+2);
    selectedCheckout = checkin.getFullYear()+'-0'+(checkin.getMonth()+1)+'-'+checkin.getDate();
    checkin.setDate(checkin.getDate()-2)
  }

  const minCheckout = checkin.getFullYear()+'-0'+(checkin.getMonth()+1)+'-'+(checkin.getDate()-1);
  const currentDate = new Date(checkin.getFullYear(), checkin.getMonth()+1, 0);
  const maxCheckout = currentDate.getFullYear()+'-'+(currentDate.getMonth()+2)+'-'+currentDate.getDate();


  interface SearchFormData {
    city: string,
    checkin: Date,
    checkout: Date,
    price: number,
  }

  function searchItem(value: SearchFormData): void {
    console.log(value)
  }



  renderBlock(
    'search-form-block',
    `
    <form id='searchForm'>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" name="city" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда </label>
            <input id="check-in-date" type="date" value=${selectedCheckin} min=${minCheckout} max=${maxCheckout}  name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value=${selectedCheckout} min=${minCheckout} max=${maxCheckout} name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type='submit'>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )

  const form = document.getElementById('searchForm');
  const checkinElement = document.getElementById('check-in-date')
  const checkoutElement = document.getElementById('check-out-date')
  const priceElement = document.getElementById('max-price')

  checkinElement.addEventListener('change',function(event){
    checkinElement.setAttribute('value',event.target.value);
  });
  checkoutElement.addEventListener('change',function(event){
    checkoutElement.setAttribute('value',event.target.value);
  });
  priceElement.addEventListener('change', function (event) {
    priceElement.setAttribute('value', event.target.value)
  })

  form.addEventListener('submit', (event) => {
    event.preventDefault()
    const city = document.getElementById('city')

    searchItem({
      'city': city.getAttribute('value'),
      'checkin': new Date (checkinElement.getAttribute('value')),
      'checkout': new Date (checkoutElement.getAttribute('value')),
      'price': +priceElement.getAttribute('value')
    })
    return searchItem;
  })
}
