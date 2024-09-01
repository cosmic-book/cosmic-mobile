type Field = {
  value: any
  setter: any
}

export const validateFields = (fields: Field[]): boolean => {
  let isValid = true

  fields.forEach((field) => {
    const hasError = !field.value

    field.setter(hasError)

    if (hasError) {
      isValid = false
    }
  })

  return isValid
}
