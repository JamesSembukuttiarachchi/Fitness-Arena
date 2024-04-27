import React from "react";

const Invoice = () => {
  return (
    <div>
      <section class="py-20 overflow-hidden relative">
        <div class="inline-block absolute 2xl:end-60 bottom-3 xl:bottom-auto">
          <a
            href="javascript:window.print()"
            class="flex items-center justify-end py-2 px-7 rounded-md bg-white print:hidden"
          >
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                class="pe-3"
              >
                <path d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" />
              </svg>
            </span>
            Print
          </a>
        </div>

        <div class="container">
          <div class="bg-white rounded-t-3xl md:p-16 p-10">
            <div class="flex flex-wrap items-center justify-between gap-6 mt-10">
              <div>
                <span class="text-lg font-bold">Bill to:</span>
                <h4 class="text-base font-bold">Dwyane Clark</h4>
                <p class="text-sm font-medium tracking-widest my-1">
                  24 Dummy Street Area,
                </p>
                <p class="text-sm font-medium tracking-widest my-1">
                  Location, Lorem ipsum,
                </p>
                <p class="text-sm font-medium tracking-widest my-1">570xx59x</p>
              </div>
              <div class="border-s border-gray-900 ps-8">
                <img src="" alt="" />
                <p class="text-sm font-medium tracking-widest mt-3">
                  Company Address,
                </p>
                <p class="text-sm font-medium">Lorem, ipsum Dolor,</p>
                <p class="text-sm font-medium">845xx145</p>
              </div>
            </div>

            <div class="flex items-center justify-between my-10">
              <h4 class="text-5xl font-semibold uppercase tracking-widest">
                Invoice
              </h4>
              <div>
                <p class="text-base font-semibold">
                  Invoice # <span class="ps-10 text-sm">24856</span>
                </p>
                <p class="text-base font-semibold">
                  Date: <span class="ps-10 text-sm">01/02/2020</span>
                </p>
              </div>
            </div>

            <div class="overflow-x-auto">
              <table class="border-collapse table-auto w-full text-sm mt-10 whitespace-pre">
                <thead>
                  <tr class="bg-gray-100">
                    <th class="p-4 border border-e-0 uppercase text-lg font-medium text-start">
                      Product Description
                    </th>
                    <th class="p-4 border-y uppercase text-lg font-medium ">
                      Price
                    </th>
                    <th class="p-4 pe-7 border-y uppercase text-lg font-medium">
                      Qty
                    </th>
                    <th class="p-4 border border-s-0 uppercase text-lg font-medium">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white">
                  <tr>
                    <td class="p-5 text-base font-medium border">
                      Lorem ipsum Dolor
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      $50.00
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      5
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      $250.00
                    </td>
                  </tr>
                  <tr>
                    <td class="p-5 text-base font-medium border">
                      Pellentesque id neque ligula
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      $10.00
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      1
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      $10.00
                    </td>
                  </tr>
                  <tr>
                    <td class="p-5 text-base font-medium border">
                      Interdum et malesuada Fames
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      $25.00
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      3
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      $75.00
                    </td>
                  </tr>
                  <tr>
                    <td class="p-5 text-base font-medium border">
                      Vivamus volutpat Faucibus
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      $40.00
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      2
                    </td>
                    <td class="p-5 text-base font-medium border text-center">
                      $80.00
                    </td>
                  </tr>
                  <tr>
                    <td class="p-8 text-base font-medium border"></td>
                    <td class="p-8 text-base font-medium border text-center"></td>
                    <td class="p-8 text-base font-medium border text-center"></td>
                    <td class="p-8 text-base font-medium border text-center"></td>
                  </tr>
                  <tr class="bg-gray-100">
                    <td
                      colspan="4"
                      class="p-1 ps-5 text-base font-medium border"
                    >
                      comments
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="3"
                      rowspan="2"
                      class="p-5 text-sm font-medium border border-e-0"
                    >
                      Payment is due max 7 days after <br />
                      invoice without deduction. <br />
                      Your bank and other datails space here.
                    </td>
                    <td class="p-5 text-base font-medium border text-center bg-gray-100">
                      <b>Subtotal:</b> $3150.00
                    </td>
                  </tr>
                  <tr>
                    <td class="p-5 text-base font-medium border text-center bg-gray-100">
                      <b>Discount:</b> $00.00
                    </td>
                  </tr>
                  <tr>
                    <td
                      colspan="5"
                      class="p-5 text-base font-medium border text-end"
                    >
                      <b>Total:</b> $405.00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="bg-teal-600 p-1"></div>
          <div class="bg-black rounded-b-3xl p-7"></div>
        </div>
      </section>
    </div>
  );
};

export default Invoice;
