import axios from 'axios'
export default {
    data() {
        return {
            status: { spin: false, tempImage: null},
            imageStatus: { active: false, msg: ''}
        }
    },
    methods: {
        uploadClick(id) {
            document.getElementById(id).click();
        },
        //check img
        showError(msg) {
            this.imageStatus.active = true;
            this.imageStatus.msg = msg;
            this.status.spin = false
            this.clrOldfile()
        },
        clrOldfile() {
            document.getElementById('avatar_img').value = null;
        },
        clrError() {
            this.imageStatus.active = false;
            this.imageStatus.msg = '';
        },
        uploadTemp() {
            this.startLoader()
            if (this.imageStatus.active) {
                this.clrError();
            }
            let file = this.$refs.img.files[0];
            if(file) {
                if (!(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg")) {
                    return this.showError("Unsupported file. The file type must be \"png, jpg or jpeg\"");
                }else {
                    if (this.checksize(file.size)) {
                        let formData = new FormData()
                        formData.append('image', file);
                        axios.post(this.getHostname + "/api/temp-upload?token=" + this.getToken, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data'
                            }
                        }).then((res) => {
                            this.stopLoader()
                            this.afterTempUpload(res.data.image)
                        }).catch((err) => {
                            this.stopLoader()
                            console.log(err.response);
                        });

                    }else {
                        return this.showError('This file is too large. The file size must be less than 1MB');
                    }
                }
            }
        },
        checksize(size) {
            return size > 1000000 ? false : true
        },
        startLoader() {
            this.status.spin = true
        },
        stopLoader() {
            this.status.spin = false
        },
        afterTempUpload(res) {
            this.stopLoader()
            this.form.tempImage = res
            this.status.tempImage = res
            this.clrOldfile()
        },
        afterDeletion() {
            this.stopLoader()
            this.form.tempImage = null
            this.status.tempImage = null
        },
    }
}