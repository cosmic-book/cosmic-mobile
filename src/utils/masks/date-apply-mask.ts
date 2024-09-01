export function dateApplyMask(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{0,2})(\d{0,4})/, (_, p1, p2, p3) => (p2 ? `${p1}/${p2}${p3 ? `/${p3}` : ''}` : p1))
}
