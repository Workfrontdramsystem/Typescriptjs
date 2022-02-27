import { renderBlock } from './lib.js'

export function renderSearchFormBlock (
  checkIn: Date,
  checkOut: Date,
) {

  const min = new Date()
  min.setHours(0, 0, 0, 0)

  const max = new Date()
  max.setHours(0, 0, 0, 0)
  max.setDate(1)
  max.setMonth(max.getMonth() + 2)
  max.setSeconds(max.getSeconds() - 1)

  const checkInDefault = new Date()
  checkInDefault.setHours(0, 0, 0, 0)
  checkInDefault.setDate(checkInDefault.getDate() + 1)

  const checkOutDefault = new Date(checkInDefault.getTime())
  checkOutDefault.setDate(checkOutDefault.getDate() + 2)

  const formatDate = date => {

    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toFixed(0).padStart(2, '0')
    const day = (date.getDate()).toFixed(0).padStart(2, '0')

    return `${year}-${month}-${day}`
  }

  renderBlock(
    'search-form-block',
    `
    <form id="search-form">
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${formatDate(checkIn || checkInDefault)}" min="${formatDate(min)}" max="${formatDate(max)}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${formatDate(checkOut || checkOutDefault)}" min="${formatDate(min)}" max="${formatDate(max)}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button type="button" id="search-button">Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
