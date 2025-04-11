import mongoose from 'mongoose'
import uri from './mongo_uri.js'
import User from './models/User.js' 
import bcryptjs from 'bcryptjs'

mongoose.connect(uri).then(async () => {
    const hashedPassword = await bcryptjs.hash('admin123', 10)

    const admin = new User({
        name: 'Barhoud Hafsa',
        email: 'barhoudhafsa@gmail.com',
        password: hashedPassword,
        role: 'admin'
    })

    await admin.save()
    console.log('Admin account created')
    mongoose.disconnect()
})