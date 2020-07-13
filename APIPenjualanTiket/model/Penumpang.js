const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    kodePenumpang:{
        type: String
    },
    namaPenumpang:{
        type: String
    },
    jenisKelamin:{
        type: String
    },
    jamBerangkat:{
        type: String
    },
    tujuan:{
        type: String
    },
    tanggalBerangkat:{
        type: String
    },
    hargaTiket:{
        type: String
    },
    gambar:{
        type: String
    }

});

module.exports = mongoose.model('penumpang',userSchema)
