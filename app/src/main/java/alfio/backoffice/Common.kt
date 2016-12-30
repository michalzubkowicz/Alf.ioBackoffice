/**
 * This file is part of alf.io backoffice.

 * alf.io backoffice is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.

 * alf.io backoffice is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.

 * You should have received a copy of the GNU General Public License
 * along with alf.io backoffice.  If not, see //www.gnu.org/licenses/>.
 */
package alfio.backoffice

import com.google.gson.ExclusionStrategy
import com.google.gson.FieldAttributes
import com.google.gson.Gson
import com.google.gson.GsonBuilder

class Common {

    companion object {
        @JvmField val gson: Gson = GsonBuilder()
                .disableHtmlEscaping()
                .setDateFormat("yyyy-MM-dd'T'HH:mm'Z'")
                .setExclusionStrategies(TransientExclusionStrategy)
                .create()
    }
}

@Retention(AnnotationRetention.RUNTIME)
@Target(AnnotationTarget.FIELD, AnnotationTarget.PROPERTY)
annotation class GsonTransient

object TransientExclusionStrategy : ExclusionStrategy {
    override fun shouldSkipClass(type: Class<*>): Boolean = false
    override fun shouldSkipField(f: FieldAttributes): Boolean =
            f.getAnnotation(GsonTransient::class.java) != null
                    || f.name.endsWith("\$delegate")
}