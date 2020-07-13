const penumpang = require('../model/Penumpang.js')
const response = require('../config/response')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId

exports.inputDataPenumpang = (data, gambar) =>
    new Promise(async (resolve, reject) =>{

        const penumpangBaru = new penumpang({
            kodePenumpang: data.kodePenumpang,
            namaPenumpang: data.namaPenumpang,
            jenisKelamin: data.jenisKelamin,
            jamBerangkat: data.jamBerangkat,
            tujuan: data.tujuan,
            tanggalBerangkat: data.tanggalBerangkat,
            hargaTiket: data.hargaTiket,
            gambar: gambar
        })

        await penumpang.findOne({kodepenumpang: data.kodepenumpang})
            .then(penumpang => {
                if (penumpang){
                    reject (response.commonErrorMsg("Kode Penumpang Sudah Digunakan"))
                } else {
                    penumpangBaru.save()
                        .then(r => {
                            resolve(response.commonSuccesMsg('Berhasil Menginput Data'))
                        }).catch(err => {
                            reject (response.commonErrorMsg('Mohon Maaf Gagal Input Data'))
                    })
                }
            }).catch(err => {
                reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.lihatDataPenumpang = () =>
    new Promise(async (resolve, reject) => {
        await penumpang.find({})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.lihatDetailDataPenumpang = (kodePenumpang) =>
    new Promise(async (resolve, reject) => {
        await penumpang.findOne({kodePenumpang: kodePenumpang})
            .then(result => {
                resolve(response.commonResult(result))
            })
            .catch(() => reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami')))
    })

exports.updatePenumpang = (id, data, gambar) =>
    new Promise(async (resolve, reject) =>{
        await penumpang.updateOne(
            {_id : ObjectId(id)},
            {
                $set: {
                    kodePenumpang: data.kodePenumpang,
                    namaPenumpang: data.namaPenumpang,
                    jenisKelamin: data.jenisKelamin,
                    jamBerangkat: data.jamBerangkat,
                    tujuan: data.tujuan,
                    tanggalBerangkat: data.tanggalBerangkat,
                    hargaTiket: data.hargaTiket,
                    gambar: gambar
                }
            }
        ) .then(penumpang => {
            resolve(response.commonSuccesMsg('Berhasil Mengubah Data'))
        }) .catch(err => {
            reject (response.commonErrorMsg('Mohon Maaf Terjadi Kesalahan Pada Server Kami'))
        })
    })

exports.hapusDataPenumpang = (_id) =>
    new  Promise(async (resolve, reject) => {
        await penumpang.remove({_id: ObjectId(_id)})
            .then(() =>{
                resolve(response.commonSuccesMsg('berhasil Menghapus Data'))
            }) .catch(() => {
                reject(response.commonErrorMsg('Mohon Maaf Terjadi Kesalhan Pada Server Kami'))
            })
    })
