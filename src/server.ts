import mongoose from 'mongoose';
import app from './app';
const port: number = 8080

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/crawling')
    console.log('Connected to Database');
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })
  }
  catch (error) {
    console.log('Failed to connect to MongoDB');
  }
}
main()