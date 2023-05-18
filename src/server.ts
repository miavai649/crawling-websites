import app from './app';
const port: number = 8080

async function main() {
  try {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }
  catch (error) {
    console.log('Failed to connect to MongoDB');
  }
}
main()