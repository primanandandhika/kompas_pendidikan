'use client'

import { useState } from 'react'
import { MINAT_CATEGORIES, MINAT_SCALE } from '@/lib/data/tes-jurusan'

export default function TesJurusan() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const category = MINAT_CATEGORIES[step]
  const questionOffset = step * category.questions.length
  const completedInStep = category.questions.every((_, index) => answers[questionOffset + index] !== undefined)
  const completedQuestions = Object.keys(answers).length
  const progress = Math.round((completedQuestions / 12) * 100)
  const scoreString = MINAT_CATEGORIES.map((item, categoryIndex) => {
    const start = categoryIndex * item.questions.length
    return item.questions.reduce((total, _, index) => total + (answers[start + index] ?? 0), 0)
  }).join(',')

  return (
    <form action="/jurusan/hasil" method="get" className="mt-8">
      <input type="hidden" name="scores" value={scoreString} />

      <div className="mb-5" aria-live="polite">
        <div className="flex items-center justify-between gap-3">
          <p className="font-label-lg text-label-lg text-on-surface">
            Bagian {step + 1} dari {MINAT_CATEGORIES.length}
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">{completedQuestions} dari 12 terjawab</p>
        </div>
        <div
          role="progressbar"
          aria-label="Kemajuan tes minat"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-2 h-2 overflow-hidden rounded-full bg-surface-container-high"
        >
          <div className="h-full rounded-full bg-primary transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <section aria-labelledby="category-title" className="rounded-3xl border border-outline-variant bg-surface-container-lowest p-4 shadow-sm md:p-6">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined rounded-2xl bg-primary-fixed p-3 text-[24px] text-on-primary-fixed" aria-hidden="true">
            {category.icon}
          </span>
          <div>
            <h2 id="category-title" className="font-title-md text-title-md text-on-surface">{category.label}</h2>
            <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant">{category.description}</p>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          {category.questions.map((question, questionIndex) => {
            const answerIndex = questionOffset + questionIndex
            return (
              <fieldset key={question}>
                <legend className="font-body-md text-body-md text-on-surface">
                  <span className="mr-2 font-label-md text-label-md text-primary">{answerIndex + 1}.</span>
                  {question}
                </legend>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  {MINAT_SCALE.map((option) => {
                    const checked = answers[answerIndex] === option.value
                    return (
                      <label key={option.value} className="cursor-pointer text-center">
                        <input
                          className="peer sr-only"
                          type="radio"
                          name={`q${answerIndex}`}
                          value={option.value}
                          aria-label={`${option.value}: ${option.label}`}
                          checked={checked}
                          onChange={() => setAnswers((current) => ({ ...current, [answerIndex]: option.value }))}
                        />
                        <span className="flex min-h-11 items-center justify-center rounded-xl border border-outline-variant bg-surface-container-lowest font-label-lg text-label-lg text-on-surface transition-colors hover:border-primary peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                          {option.value}
                        </span>
                      </label>
                    )
                  })}
                </div>
                <div className="mt-1 flex justify-between gap-2 font-label-sm text-label-sm text-on-surface-variant">
                  <span>Tidak menggambarkan</span>
                  <span>Sangat menggambarkan</span>
                </div>
              </fieldset>
            )
          })}
        </div>
      </section>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((current) => current - 1)}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-outline-variant px-5 py-3 font-label-lg text-label-lg text-on-surface transition-colors hover:border-primary hover:text-primary"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_back</span>
            Sebelumnya
          </button>
        ) : <span />}

        {step < MINAT_CATEGORIES.length - 1 ? (
          <button
            type="button"
            disabled={!completedInStep}
            onClick={() => setStep((current) => current + 1)}
            className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 font-label-lg text-label-lg text-on-primary shadow-sm transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
          >
            Lanjut
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
          </button>
        ) : (
          <button
            type="submit"
            disabled={!completedInStep || completedQuestions !== 12}
            className="ml-auto inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 font-label-lg text-label-lg text-on-primary shadow-sm transition-colors hover:bg-primary-container disabled:cursor-not-allowed disabled:opacity-50"
          >
            Lihat hasil minat
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">arrow_forward</span>
          </button>
        )}
      </div>
    </form>
  )
}
