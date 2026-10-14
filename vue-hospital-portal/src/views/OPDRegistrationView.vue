<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useHospitalStore } from '../stores/hospitalStore'

const hospital = useHospitalStore()
const router = useRouter()

const opdMessage = ref('')
const admissionMessage = ref('')

const form = ref({
  name: '',
  age: '',
  doctor: hospital.doctors[0]?.name || 'Dr. Sarah Connor',
  bedType: 'General Ward',
  vitals: {
    bp: '120/80',
    hr: 75,
    temp: 98.6
  },
  bill: 350
})

function updateBedType(type) {
  form.value.bedType = type
  if (type === 'ICU') {
    form.value.bill = 1200
  } else {
    form.value.bill = 350
  }
}

const predictedRisk = computed(() => {
  return hospital.calculateRisk(form.value.vitals)
})

function handleBookOpd(doctorId) {
  const result = hospital.bookAppointment(doctorId)
  opdMessage.value = result.message
  setTimeout(() => {
    opdMessage.value = ''
  }, 3500)
}

function handleAdmitPatient() {
  if (!form.value.name.trim() || !form.value.age) {
    return
  }
  hospital.admitPatient({
    name: form.value.name,
    age: form.value.age,
    doctor: form.value.doctor,
    bedType: form.value.bedType,
    vitals: {
      bp: form.value.vitals.bp,
      hr: form.value.vitals.hr,
      temp: form.value.vitals.temp
    },
    bill: form.value.bill,
    paymentStatus: 'Pending'
  })

  admissionMessage.value = `Patient ${form.value.name} successfully admitted to ${form.value.bedType}!`
  form.value.name = ''
  form.value.age = ''
  form.value.vitals = { bp: '120/80', hr: 75, temp: 98.6 }
  form.value.bedType = 'General Ward'
  form.value.bill = 350

  setTimeout(() => {
    admissionMessage.value = ''
    router.push('/patients')
  }, 1200)
}
</script>

<template>
  <div class="registration-page">
    <section class="card opd-section">
      <h2>OPD Doctor Appointments</h2>
      <div v-if="opdMessage" class="alert alert-info">
        {{ opdMessage }}
      </div>
      <div class="doctor-grid">
        <div v-for="doc in hospital.doctors" :key="doc.id" class="doctor-card">
          <div class="doctor-header">
            <h3>{{ doc.name }}</h3>
            <span class="specialty-badge">{{ doc.specialty }}</span>
          </div>
          <p class="fee-text">Consultation Fee: <strong>${{ doc.fee }}</strong></p>
          <p class="slot-text">
            Available Slots:
            <span :class="['slot-count', doc.availableSlots > 0 ? 'slot-open' : 'slot-full']">
              {{ doc.availableSlots }}
            </span>
          </p>
          <button
            class="btn btn-opd"
            :disabled="doc.availableSlots === 0"
            @click="handleBookOpd(doc.id)"
          >
            {{ doc.availableSlots > 0 ? 'Book Appointment' : 'Fully Booked' }}
          </button>
        </div>
      </div>
    </section>

    <section class="card admission-section">
      <h2>Patient Bed & ICU Admission Form</h2>
      <div v-if="admissionMessage" class="alert alert-success">
        {{ admissionMessage }}
      </div>
      <form @submit.prevent="handleAdmitPatient" class="admission-form">
        <div class="form-row">
          <div class="form-group flex-1">
            <label for="pName">Patient Name</label>
            <input id="pName" v-model="form.name" type="text" placeholder="e.g. Eleanor Vance" required />
          </div>
          <div class="form-group width-small">
            <label for="pAge">Age</label>
            <input id="pAge" v-model="form.age" type="number" min="1" max="130" placeholder="e.g. 34" required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group flex-1">
            <label for="pDoc">Assigned Doctor</label>
            <select id="pDoc" v-model="form.doctor">
              <option v-for="doc in hospital.doctors" :key="doc.id" :value="doc.name">
                {{ doc.name }} ({{ doc.specialty }})
              </option>
            </select>
          </div>
          <div class="form-group flex-1">
            <label>Bed Allocation</label>
            <div class="bed-options">
              <button
                type="button"
                :class="['bed-btn', form.bedType === 'General Ward' ? 'bed-btn-active' : '']"
                @click="updateBedType('General Ward')"
              >
                General Ward ($350)
              </button>
              <button
                type="button"
                :class="['bed-btn', form.bedType === 'ICU' ? 'bed-btn-active bed-btn-icu' : '']"
                @click="updateBedType('ICU')"
              >
                ICU ($1,200)
              </button>
            </div>
          </div>
        </div>

        <fieldset class="vitals-fieldset">
          <legend>Patient Vitals</legend>
          <div class="vitals-row">
            <div class="form-group flex-1">
              <label for="vBp">Blood Pressure (mmHg)</label>
              <input id="vBp" v-model="form.vitals.bp" type="text" placeholder="120/80" required />
            </div>
            <div class="form-group flex-1">
              <label for="vHr">Heart Rate (bpm)</label>
              <input id="vHr" v-model.number="form.vitals.hr" type="number" min="30" max="250" required />
            </div>
            <div class="form-group flex-1">
              <label for="vTemp">Temperature (°F)</label>
              <input id="vTemp" v-model.number="form.vitals.temp" type="number" step="0.1" min="90" max="110" required />
            </div>
          </div>

          <div class="risk-preview">
            <span>Evaluated Risk Level: </span>
            <span :class="['risk-tag', 'risk-' + predictedRisk.toLowerCase()]">
              {{ predictedRisk }} Risk
            </span>
          </div>
        </fieldset>

        <div class="form-row">
          <div class="form-group flex-1">
            <label for="pBill">Estimated Billing ($)</label>
            <input id="pBill" v-model.number="form.bill" type="number" min="0" required />
          </div>
        </div>

        <button type="submit" class="btn btn-submit">
          Admit Patient & Allocate Bed
        </button>
      </form>
    </section>
  </div>
</template>

<style scoped>
.registration-page {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.card {
  background-color: #ffffff;
  border: 1px solid #e1e8ed;
  border-radius: 8px;
  padding: 20px 24px;
}

h2 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 19px;
  color: #1a202c;
  border-bottom: 2px solid #edf2f7;
  padding-bottom: 8px;
}

.alert {
  padding: 10px 14px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
}

.alert-info {
  background-color: #ebf8ff;
  color: #2b6cb0;
  border: 1px solid #bee3f8;
}

.alert-success {
  background-color: #f0fff4;
  color: #276749;
  border: 1px solid #c6f6d5;
}

.doctor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 15px;
}

.doctor-card {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 14px;
  background-color: #fafbfc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.doctor-header h3 {
  margin: 0 0 6px 0;
  font-size: 16px;
  color: #2d3748;
}

.specialty-badge {
  display: inline-block;
  background-color: #e2e8f0;
  color: #4a5568;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 12px;
}

.fee-text,
.slot-text {
  margin: 8px 0;
  font-size: 14px;
  color: #4a5568;
}

.slot-count {
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 4px;
}

.slot-open {
  background-color: #c6f6d5;
  color: #22543d;
}

.slot-full {
  background-color: #fed7d7;
  color: #742a2a;
}

.admission-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.flex-1 {
  flex: 1;
  min-width: 200px;
}

.width-small {
  width: 110px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}

input,
select {
  padding: 8px 10px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 14px;
  background-color: #ffffff;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3182ce;
}

.bed-options {
  display: flex;
  gap: 10px;
}

.bed-btn {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cbd5e0;
  background-color: #f7fafc;
  color: #4a5568;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}

.bed-btn-active {
  background-color: #3182ce;
  color: #ffffff;
  border-color: #3182ce;
}

.bed-btn-active.bed-btn-icu {
  background-color: #dd6b20;
  border-color: #dd6b20;
}

.vitals-fieldset {
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px 16px;
  background-color: #f7fafc;
}

legend {
  font-size: 13px;
  font-weight: bold;
  color: #2b6cb0;
  padding: 0 6px;
}

.vitals-row {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.risk-preview {
  margin-top: 10px;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.risk-tag {
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
  font-size: 12px;
  text-transform: uppercase;
}

.risk-high {
  background-color: #fed7d7;
  color: #9b2c2c;
}

.risk-moderate {
  background-color: #feebc8;
  color: #c05621;
}

.risk-normal {
  background-color: #c6f6d5;
  color: #22543d;
}

.btn {
  padding: 9px 16px;
  border: none;
  border-radius: 5px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
}

.btn-opd {
  background-color: #2b6cb0;
  color: #ffffff;
  margin-top: 8px;
}

.btn-opd:hover:not(:disabled) {
  background-color: #2c5282;
}

.btn-opd:disabled {
  background-color: #cbd5e0;
  cursor: not-allowed;
  color: #718096;
}

.btn-submit {
  background-color: #2f855a;
  color: #ffffff;
  padding: 12px;
}

.btn-submit:hover {
  background-color: #276749;
}
</style>
