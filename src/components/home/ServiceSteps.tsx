import { Upload, CreditCard, Truck, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    title: 'Upload Foto',
    description: 'Pilih dan upload foto-foto terbaik Anda melalui website kami',
    step: 1,
  },
  {
    icon: CreditCard,
    title: 'Pilih Produk & Bayar',
    description: 'Pilih jenis produk yang diinginkan dan lakukan pembayaran',
    step: 2,
  },
  {
    icon: Truck,
    title: 'Proses & Kirim',
    description: 'Pesanan Anda akan diproses dan dikirim ke alamat tujuan',
    step: 3,
  },
  {
    icon: CheckCircle,
    title: 'Terima Pesanan',
    description: 'Terima hasil cetakan foto berkualitas tinggi di rumah Anda',
    step: 4,
  },
];

const ServiceSteps = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cara Memesan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Proses pemesanan yang mudah dan cepat untuk mendapatkan hasil cetak foto terbaik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div
              key={step.step}
              className="relative bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {step.step}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <step.icon className="w-8 h-8 text-primary-600" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {step.title}
              </h3>
              <p className="text-gray-600 text-center text-sm">
                {step.description}
              </p>

              {/* Connector Line (hidden on last item and mobile) */}
              {step.step < 4 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-primary-200" />
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/cetak-foto"
            className="inline-flex items-center px-8 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
          >
            Mulai Pesan Sekarang
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServiceSteps;
