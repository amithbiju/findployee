import React from 'react'

export default function CreateTeam() {
  return (
    <div class="flex flex-col md:flex-row">
        <div class="bg-blue-600 text-white p-8 md:w-1/2 flex flex-col justify-center">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">What is Google Summer of Code?</h2>
            <p class="text-lg mb-6">
            Google Summer of Code is a global, online program focused on bringing new contributors into open source software development. GSoC Contributors work with an open source organization on a 12+ week programming project under the guidance of mentors.
            </p>
            <button class="border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-blue-600">
            Learn more
            </button>
        </div>
        <div class="bg-gray-800 text-white p-8 md:w-1/2 grid grid-cols-2 gap-6 md:gap-8 text-center">
            <div>
            <p class="text-3xl font-bold">20K+</p>
            <p class="text-sm">New Contributors</p>
            </div>
            <div>
            <p class="text-3xl font-bold">116</p>
            <p class="text-sm">Countries</p>
            </div>
            <div>
            <p class="text-3xl font-bold">1000+</p>
            <p class="text-sm">Open Source Organizations</p>
            </div>
            <div>
            <p class="text-3xl font-bold">45M+</p>
            <p class="text-sm">Lines of Code</p>
            </div>
            <div>
            <p class="text-3xl font-bold">19K+</p>
            <p class="text-sm">Mentors</p>
            </div>
            <div>
            <p class="text-3xl font-bold">19</p>
            <p class="text-sm">Years</p>
            </div>
        </div>
    </div>
  )
}
