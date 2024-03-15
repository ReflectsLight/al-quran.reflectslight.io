namespace :submodules do
  desc "Copy surah-name-glyphs into place"
  task :'copy-glyphs' do
    sh "cp -Rfv " \
       "submodules/surah-name-glyphs/opengraph/*.png " \
       "src/images/opengraph/"
  end
end
