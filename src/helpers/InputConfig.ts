export default function inputConfig() {
  return {
    required: 'Area is requred!',
    minLength: {
      value: 5,
      message: 'Minimum of 5 characters'
    }
  }
}