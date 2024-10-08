import { defineStore } from 'pinia'
import { utilUrls } from '@/utils/Urls';
import Http from '@/utils/Http';

export const useTimeStore = defineStore('timeStore', {
    state: ()=>({
        currentTime: '',
        offset: 0,
    }),
    actions: {
        updateTime() {
            this.currentTime = (new Date(Date.now() + this.offset)).toISOString();
        },
        startUpdatingTime() {
            this.stopUpdatingTime()
            this.calibrateOffset()
            this.updateTime()
            this.calibrateInterval = setInterval(this.calibrateOffset, 30000)
            this.updateInterval = setInterval(this.updateTime, 500)
        },
        stopUpdatingTime() {
            if(this.updateInterval) clearInterval(this.updateInterval);
            if(this.calibrateInterval) clearInterval(this.calibrateInterval);
        },
        calibrateOffset() {
            Http.get(utilUrls.ntpTime).then(res=>{
                let ntpTimeStamp = res.unixtime * 1000 + Number(res.utc_datetime.split('.')[1].slice(0, 3))
                let systemTimeStamp = Date.now()
                this.offset = ntpTimeStamp - systemTimeStamp
            })
        }
    }
})
