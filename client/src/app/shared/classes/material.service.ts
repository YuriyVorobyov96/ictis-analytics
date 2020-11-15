import { ElementRef } from '@angular/core';

declare var M;

export interface MaterialInstance {
  open?(): void,
  close?(): void,
  destroy?(): void,
}

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date,
  type?: string,
}

export class MaterialService {

  static toast(message: string) {
    M.toast({ html: message });
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement);
  }

  static updateTextInputs() {
    M.updateTextFields();
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement);
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement);
  }

  static initDatePicker(ref: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      i18n: {
        cancel: 'Закрыть',
        clear: 'Сбросить',
        months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
        monthsShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
        weekdays: ["Воскресенье","Понедельник", "Вторник", "Среда", "Чеверг", "Пятница", "Суббота"],
        weekdaysShort: ["Вскр","Пон", "Втр", "Ср", "Чтв", "Пт", "Сбт"],
        weekdaysAbbrev: ["Вс","Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
      },
      onClose,
    });
  }

  static initSelect(ref: ElementRef): MaterialDatepicker {
    return M.FormSelect.init(ref.nativeElement);
  }

  static initTapTarget(ref: ElementRef): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement);
  }

}