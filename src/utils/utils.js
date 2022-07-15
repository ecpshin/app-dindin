import { format, add } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formataData(date) {
    const d = add(+new Date(date), { hours: 3 });
    return format(+new Date(d), 'dd/MM/yy');
}

export function dataForm(date) {
    const d = add(new Date(date), { hours: 3 });
    return format(+new Date(d), 'yyyy-MM-dd');
}

export function diaDaSemana(date) {
    const localDate = format(+new Date(date), 'EEE', { locale: ptBR });
    return localDate.slice(0, 1).toUpperCase() + localDate.slice(1).toLowerCase();
}

export function formataMoeda(valor) {
    if (!valor) {
        return 'R$ 0,00';
    }
    return Number(valor / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function ajustaValor(valor) {

    if (valor.indexOf(',') !== -1) {
        valor.replace(',', '.');
        console.log(valor);
        return valor.replace(',', '.');
    }

    if (valor.indexOf('.') !== -1) {
        console.log(valor);
        return Number(valor) * 100;
    }

    return (Number(valor) * 100).toString();
}

export function formatClass(string) {
    if (string === 'entrada') {
        return 'linha plus';
    } else {
        return 'linha minus';
    }
}
