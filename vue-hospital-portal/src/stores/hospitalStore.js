import { defineStore } from 'pinia'

export const useHospitalStore = defineStore('hospital', {
  state: () => ({
    doctors: [
      { id: 1, name: 'Dr. Sarah Connor', specialty: 'Cardiology', fee: 150, availableSlots: 5 },
      { id: 2, name: 'Dr. Gregory House', specialty: 'Diagnostics & ICU', fee: 250, availableSlots: 3 },
      { id: 3, name: 'Dr. John Watson', specialty: 'General Medicine', fee: 90, availableSlots: 6 }
    ],
    patients: [
      {
        id: 1,
        name: 'Robert Paulson',
        age: 45,
        vitals: { bp: '130/85', hr: 78, temp: 98.6 },
        doctor: 'Dr. Sarah Connor',
        bedType: 'General Ward',
        bill: 350,
        risk: 'Moderate',
        paymentStatus: 'Pending'
      }
    ]
  }),
  getters: {
    totalPatients: (state) => state.patients.length,
    criticalCount: (state) => state.patients.filter((p) => p.risk === 'High' || p.bedType === 'ICU').length,
    totalRevenue: (state) => state.patients.reduce((sum, p) => sum + (Number(p.bill) || 0), 0)
  },
  actions: {
    calculateRisk(vitals) {
      if (!vitals) return 'Normal'
      const bpStr = vitals.bp || vitals.bloodPressure || '120/80'
      const hrVal = Number(vitals.hr || vitals.heartRate || 75)
      const tempVal = Number(vitals.temp || vitals.temperature || 98.6)

      let systolic = 120
      let diastolic = 80
      if (typeof bpStr === 'string' && bpStr.includes('/')) {
        const parts = bpStr.split('/').map((s) => parseInt(s.trim(), 10))
        if (!isNaN(parts[0])) systolic = parts[0]
        if (!isNaN(parts[1])) diastolic = parts[1]
      }

      if (systolic >= 140 || systolic < 90 || diastolic >= 90 || hrVal > 100 || hrVal < 50 || tempVal >= 102) {
        return 'High'
      }
      if (systolic >= 125 || diastolic >= 83 || hrVal > 85 || hrVal < 60 || tempVal >= 100.4) {
        return 'Moderate'
      }
      return 'Normal'
    },
    admitPatient(patientData) {
      const risk = this.calculateRisk(patientData.vitals)
      const autoBill = patientData.bedType === 'ICU' ? 1200 : 350
      const newPatient = {
        id: Date.now(),
        name: patientData.name,
        age: Number(patientData.age),
        doctor: patientData.doctor || 'Dr. Sarah Connor',
        bedType: patientData.bedType || 'General Ward',
        bill: Number(patientData.bill) || autoBill,
        vitals: {
          bp: (patientData.vitals && (patientData.vitals.bp || patientData.vitals.bloodPressure)) || '120/80',
          hr: Number(patientData.vitals && (patientData.vitals.hr || patientData.vitals.heartRate)) || 72,
          temp: Number(patientData.vitals && (patientData.vitals.temp || patientData.vitals.temperature)) || 98.6
        },
        risk: risk,
        paymentStatus: patientData.paymentStatus || 'Pending'
      }
      this.patients.unshift(newPatient)
      return newPatient
    },
    dischargePatient(id) {
      this.patients = this.patients.filter((p) => p.id !== id)
    },
    bookAppointment(doctorId) {
      const doc = this.doctors.find((d) => d.id === doctorId)
      if (doc && doc.availableSlots > 0) {
        doc.availableSlots -= 1
        return { success: true, message: `Appointment confirmed with ${doc.name}` }
      }
      return { success: false, message: 'No appointment slots available for this doctor' }
    },
    settlePayment(id) {
      const p = this.patients.find((item) => item.id === id)
      if (p) {
        p.paymentStatus = 'Paid'
      }
    }
  }
})
